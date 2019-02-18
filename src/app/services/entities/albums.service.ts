import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudMethods } from 'src/app/utils/abstract-classes/crud-methods.class';

@Injectable({ providedIn: 'root' })
export class AlbumsService extends CrudMethods {

    constructor(public http: HttpClient) {
        super();
        this.entity = 'albums'
    }

}