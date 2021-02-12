import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, switchMap, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import AuthResponseData from "../authResponseData.model";
import {
  AUTO_LOGIN,
  LOGIN,
  Login,
  LoginFail,
  LoginStart,
  LOGIN_START,
  LOGOUT,
  SignupStart,
  SIGNUP_START,
} from "./auth.actions";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user.model";
import { AuthService } from "../auth.service";
import LoginPayload from "./models/loginPayload.model";

const handlerLogin = (resData) => {
  const {
    localId: userId,
    expiresIn,
    email: resEmail,
    idToken: token,
  } = resData;
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User(resEmail, userId, token, expirationDate);
  localStorage.setItem("userData", JSON.stringify(user));

  return new Login({
    userId,
    expirationDate,
    email: resEmail,
    token,
    redirect: true,
  });
};

const handleError = (errorRes: HttpErrorResponse) => {
  let errorMessage = "An unknown error occurred!";
  if (!errorRes.error || !errorRes.error.error) {
    return of(new LoginFail({ message: errorMessage }));
  }
  switch (errorRes.error.error.message) {
    case "EMAIL_EXISTS":
      errorMessage = "This email exists already";
      break;
    case "EMAIL_NOT_FOUND":
      errorMessage = "This email does not exist.";
      break;
    case "INVALID_PASSWORD":
      errorMessage = "This password is not correct.";
      break;
  }
  return of(new LoginFail({ message: errorMessage }));
};
@Injectable()
export class AuthEffects {
  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGIN_START),
      switchMap((authData: LoginStart) => {
        const { firebaseSignin, firebaseAPIKey } = environment;
        const url = `${firebaseSignin}${firebaseAPIKey}`;
        return this.http
          .post<AuthResponseData>(url, {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          })
          .pipe(
            tap((resData) => {
              this.authService.autoLogout(+resData.expiresIn);
            }),
            map(handlerLogin),
            catchError(handleError)
          );
      })
    )
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LOGIN),
        tap((authData: { payload: LoginPayload }) => {
          if (authData.payload.redirect) {
            this.router.navigate(["/"]);
          }
        })
      ),
    { dispatch: false }
  );

  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(SIGNUP_START),
      switchMap((authData: SignupStart) => {
        const { email, password } = authData.payload;
        const { firebaseSignup, firebaseAPIKey } = environment;
        const url = `${firebaseSignup}${firebaseAPIKey}`;
        return this.http
          .post<AuthResponseData>(url, {
            email,
            password,
            returnSecureToken: true,
          })
          .pipe(
            tap((resData) => {
              this.authService.autoLogout(+resData.expiresIn);
            }),
            map(handlerLogin)
          );
      }),
      catchError(handleError)
    )
  );

  autoLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LOGOUT),
        tap(() => {
          localStorage.removeItem("userData");
          this.authService.clearLogoutTimer();
          this.router.navigate(["/auth"]);
        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem("userData"));
        if (!userData) {
          return { type: "dummy" };
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          // this.authService.autoLogout(expirationDuration);
          return new Login({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false,
          });
        }

        return { type: "dummy" };
      })
    )
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
