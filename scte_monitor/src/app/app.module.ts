import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
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

import { LocalBreakComponent } from './local-break/local-break.component';
import { ContentIdComponent } from './content-id/content-id.component';
import { PlacementOpportunityComponent } from './placement-opportunity/placement-opportunity.component';
import { ProgramComponent } from './program/program.component';
import { ProviderAdComponent } from './provider-ad/provider-ad.component';
import { NetworkNamesService } from './network-names.service';
import { AddControlComponent } from './add-control/add-control.component';
import { UpdateComponent } from './update/update.component';

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
    LocalBreakComponent,
    ContentIdComponent,
    PlacementOpportunityComponent,
    ProgramComponent,
    ProviderAdComponent,
    AddControlComponent,
    UpdateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    RouterModule.forRoot(routes), 
    RouterModule.forRoot([{ path: '', component: ControlComponent }]),
    
    RouterModule.forRoot([{ path: 'control', component: ControlComponent, children: [ 
      { path: 'local-break', component: LocalBreakComponent },
      { path: 'content-id', component: ContentIdComponent },
      { path: 'placement-opportunity', component: PlacementOpportunityComponent },
      { path: 'program', component: ProgramComponent },
      { path: 'provider-ad', component: ProviderAdComponent },
      { path: 'add-control', component: AddControlComponent }
     ]}
    ]),
    
  ],
  entryComponents: [
    LocalBreakComponent,
    ContentIdComponent,
    PlacementOpportunityComponent,
    ProgramComponent,
    ProviderAdComponent,
    AddControlComponent
  ],
  providers: [NetworkNamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }