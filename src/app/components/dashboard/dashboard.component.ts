import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { SocketService } from '../../services/socket.service';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private isOrderFormVisible : boolean;
  private orderForm: FormGroup;
  private sellOrdersCount: Number;
  private buyOrdersCount: Number;
  private orders: any[];
  private show: boolean;
  private dataTable: any;

  constructor(private orderService: OrderService, private userService: UserService, 
  	private formBuilder: FormBuilder, private socketService: SocketService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
  	this.orders = [];
  	this.orderForm = this.formBuilder.group({
            orderType: ['', Validators.required],
            amount: ['', Validators.required],
            price: ['', Validators.required],
            username: ['dpk', Validators.required],
        });
  	//call to get sell and buy order counts
  	this.getOrderCounts();
  	this.getAllOrders();

  	this.socketService.getMessages().subscribe((result) => {
       this.orders = result[0];
       this.sellOrdersCount = result[1].buyOrders;
       this.buyOrdersCount = result[1].sellOrders;
    });
  }

  private showOrderForm() {
  	this.isOrderFormVisible = true;
  }

  private hideOrderForm() {
  	this.isOrderFormVisible = false;
  }

  private onSubmit() {
  	this.show = true;

  	let formValue = this.orderForm.value;
	let order = {
		"side": formValue.orderType.toLowerCase( ),
		"price": formValue.price,
		"amount": formValue.amount,
		"username": "dpk"
	}

  	this.orderService.createOrder(order).subscribe((result: any) => {
  		this.show = false;
  	},(err) => {
  		this.show = false;
  	})

  }

  private getOrderCounts() {
  	this.orderService.getOrdersCount().subscribe((result: any) => {
  		this.buyOrdersCount = result.message.buyOrders;
  		this.sellOrdersCount = result.message.sellOrders;
  	},(err) => {
  		this.buyOrdersCount = 0;
  		this.sellOrdersCount = 0;
  	})
  }

  private getAllOrders() {
  	this.orderService.getAllOrders().subscribe((result: any) => {
  		this.orders = result.message;

        this.chRef.detectChanges();

        //use jQuery DataTables :
        const table: any = $('#orderDT');
        this.dataTable = table.DataTable();
  	})
  }

}
