import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: any) {
        return this.http.post(`${environment.apiUrl}/user/register`, user);
    }

    getCryptoBalances() {
    	return this.http.get(`${environment.apiUrl}/user/balances`);
    }
}