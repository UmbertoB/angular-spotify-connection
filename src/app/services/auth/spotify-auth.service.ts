import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { getObjectCookie, eraseCookie, getAllUrlParams } from 'src/app/utils/app.utils';
import { TokenObject, AuthParams } from 'src/app/utils/typings/auth.typings';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SpotifyAuthService {

    constructor(public http: HttpClient, private router: Router) { }

    /**
    * Receives a stringified token and saves in cookies
    * @param {string} token
    */
    public getSpotifyAcessToken(): void {

        const authParams: AuthParams = {
            client_id: environment.CLIENT_ID,
            response_type: environment.RESPONSE_TYPE,
            redirect_uri: environment.REDIRECT_URI
        };

        const url: string = `https://accounts.spotify.com/authorize?response_type=${authParams.response_type}&client_id=${authParams.client_id}&redirect_uri=${encodeURIComponent(authParams.redirect_uri)}`;

        window.open(url, '_self');

    }

    /**
     * Receives a stringified token and saves in cookies
     * @param {string} token
     */
    public createTokenData(token: string): void {

        const tokenObject: TokenObject = JSON.parse(token);

        document.cookie = `auth_token=${token};Max-Age=${tokenObject.expires_in}`;

    }


    /**
    * Returns the Token stored in cookies
    * @returns {any}
    */
    public getToken(): any {

        const tokenObject: TokenObject = getObjectCookie('auth_token');

        if (typeof tokenObject !== 'object') {

            eraseCookie('auth_token');

        } else {

            this.router.navigate(['']);
            return tokenObject;


        }


    }

    public isAuthorized(): boolean {
        let isAuth: boolean;

        let token: string;
        const hashIndex: number = window.location.href.indexOf('#');
        const url: string = window.location.href.split('').splice(hashIndex + 1).join('');
        if (url !== window.location.href) token = JSON.stringify(getAllUrlParams(url));

        if (token && !this.getToken()) {
          this.createTokenData(token);
          isAuth = true;
        } else if (!this.getToken()) {
          this.getSpotifyAcessToken();
          isAuth = false;
        } else {
            isAuth = true;
        }
    
        return isAuth;
    }



}