import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ControlComponent } from './control/control.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppBodyComponent } from './app-body/app-body.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { NetworkNamesService } from './network-names.service';
import { AddControlComponent } from './add-control/add-control.component';
import {LbcComponent } from './lbc/lbc.component';
import {CicComponent } from './cic/cic.component';
import {PocComponent } from './poc/poc.component';
import {PcComponent } from './pc/pc.component';
import {PacComponent } from './pac/pac.component';
import {NbcComponent } from './nbc/nbc.component';

const routes: Routes = [ 
];

@NgModule({
  declarations: [
    AppComponent,
    ControlComponent,
    DashboardComponent,
    AppBodyComponent,
    TopBarComponent,
    NavBarComponent,
    AddControlComponent,
    LbcComponent,
    CicComponent,
    PocComponent,
    PcComponent,
    PacComponent,
    NbcComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    RouterModule.forRoot(routes), 
    RouterModule.forRoot([{ path: '', component: DashboardComponent }]),
    
    RouterModule.forRoot([{ path: 'control', component: ControlComponent, children: [ 
      { path: 'add-control', component: AddControlComponent }
     ]}
    ]),
    
  ],
  entryComponents: [
    AddControlComponent
  ],
  providers: [NetworkNamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }