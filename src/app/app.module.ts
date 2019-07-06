import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgxLoadingModule, ngxLoadingAnimationTypes} from 'ngx-loading';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { TimestampConverterPipe } from './date-format.pipe';
import {DataTableModule} from "angular-6-datatable";

import  { AuthenticationService } from './services/authentication.service';
import  { UserService } from './services/user.service';
import  { OrderService } from './services/order.service';
import  { SocketService } from './services/socket.service';
import  { AuthGuard } from './guards';
import  { routing } from './app.routing';
import { HistoryComponent } from './components/history/history.component';

const config: SocketIoConfig = { 
  url: 'http://localhost:4800', options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TimestampConverterPipe,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    NgxLoadingModule.forRoot({
        animationType: ngxLoadingAnimationTypes.wanderingCubes,
        backdropBackgroundColour: 'rgba(0,0,0,0.7)', 
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff', 
        secondaryColour: '#ffffff', 
        tertiaryColour: '#ffffff'
    }),
    DataTableModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    OrderService,
    SocketService,
    {provide: APP_BASE_HREF, useValue : '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
