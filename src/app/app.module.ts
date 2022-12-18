import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EventsListComponent, EventThumbnailComponent, EventDetailComponent,
  EditEventComponent, NewEventComponent, SessionListComponent,
  CreateSessionComponent, VoterService, LocationValidator } from '../shared/modules/events';
import { NavbarComponent } from 'src/shared/modules/nav/navbar.component';
import { Toastr, TOASTR_TOKEN, EventListResolver, EventRouteActivator, EventService, JQ_TOKEN } from 'src/shared/services';
import {appRoutes} from "../routes";
import { RouterModule } from '@angular/router';
import { Error404Component } from 'src/shared/modules/errors/404.component';
import { AuthService } from 'src/shared/modules/user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapsiblePanelComponent, SimpleModalComponent, UpvoteComponent } from 'src/shared/components';
import { DurationPipe } from 'src/shared/pipes';
import { ModalTriggerDirective } from 'src/shared/directives';

let toastr:Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventThumbnailComponent,
    EventsListComponent,
    EventDetailComponent,
    NewEventComponent,
    Error404Component,
    EditEventComponent,
    CreateSessionComponent,
    SessionListComponent,
    CollapsiblePanelComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EventService,
    EventRouteActivator,
    {provide:"canDeactivateCreateEvent",useValue:checkDirtyState},
    {provide:TOASTR_TOKEN, useValue: toastr},
    {provide:JQ_TOKEN, useValue:jQuery},
    EventListResolver,
    AuthService,
    VoterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function checkDirtyState(component:NewEventComponent) {
  if(component.isDirty)
    return window.confirm('You have not saved this form, do you want to cancel?');
  return true;
}