import { Injectable } from '@angular/core';
import { CrudMethods } from 'src/app/utils/abstract-classes/crud-methods.class';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ArtistsService extends CrudMethods {

    constructor(public http: HttpClient) {
        super();
        this.entity = 'artists'
    }

}