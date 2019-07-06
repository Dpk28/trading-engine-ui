import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  private sellOrdersCount: Number;
  private buyOrdersCount: Number;
  private trades: any[];
  private dataTable: any;

  constructor(private orderService: OrderService, private userService: UserService, private socketService: SocketService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
  	this.getOrderCounts();
  	this.getAllTradeHistory();
  	this.socketService.getMessages().subscribe((result) => {
       this.trades = result[2];
       this.sellOrdersCount = result[1].buyOrders;
       this.buyOrdersCount = result[1].sellOrders;
    });
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

  private getAllTradeHistory() {
  	this.orderService.getTradeHistory().subscribe((result: any) => {
  		this.trades = result.message;

  		this.chRef.detectChanges();

        //use jQuery DataTables :
        const table: any = $('#historyDT');
        this.dataTable = table.DataTable();
  	})
  }

}
