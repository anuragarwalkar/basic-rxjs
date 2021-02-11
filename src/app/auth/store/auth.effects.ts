import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, switchMap, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthResponseData } from "../auth.service";
import {
  LOGIN,
  Login,
  LoginFail,
  LoginStart,
  LOGIN_START,
} from "./auth.actions";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(LOGIN_START),
    switchMap((authData: LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
            environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData) => {
            console.log("resData:", resData);
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return new Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate,
            });
          }),
          catchError((errorRes: HttpErrorResponse) => {
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
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(LOGIN),
    tap(() => {
      this.router.navigate(["/"]);
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
