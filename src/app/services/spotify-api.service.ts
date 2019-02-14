import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getObjectCookie, getCookie, eraseCookie } from 'src/app/utils/app.utils';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SpotifyApiService {

    constructor(public http: HttpClient, private router: Router) { }

    public authorizeSpotify(): void {

        const params = {
            client_id: '666a2e842dc649b7a1850f516adb7532',
            response_type: 'code',
            redirect_uri: 'http://localhost:4200'
        };

        const url = `https://accounts.spotify.com/authorize?response_type=${params.response_type}&client_id=${params.client_id}&redirect_uri=${encodeURIComponent(params.redirect_uri)}`;

        window.open(url, '_self');

    }

    public createTokenData(code: string): void {

        eraseCookie('auth_token');

        const expires: number = 21600;

        document.cookie = `auth_token=${code};Max-Age=${expires}`;

    }

    /**
*
* @returns {any}
*/
    public getToken(): any {

        const jsonData: any = getObjectCookie('auth_token');


        if (!(typeof jsonData === 'object')) {

            eraseCookie('auth_token');

        } else {

            return jsonData.token;

        }




    }

}