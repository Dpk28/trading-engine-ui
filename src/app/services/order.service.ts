import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

    createOrder(order: any) {
        return this.http.post(`${environment.apiUrl}/order/create`, order);
    }

    getAllOrders() {
        return this.http.get(`${environment.apiUrl}/orders`);
    }

    getOrdersCount() {
        return this.http.get(`${environment.apiUrl}/orders/counts`);
    }

    getTradeHistory() {
        return this.http.get(`${environment.apiUrl}/trades`);
    }
}