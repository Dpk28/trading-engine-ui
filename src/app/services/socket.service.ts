import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {

  constructor(private socket: Socket) { }

  public getMessages = () => {
    	return Observable.create((observer) => {
            this.socket.on('order_book', (message) => {
                observer.next(message);
            });
        });
    }
}
