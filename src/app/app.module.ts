import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventsListComponent } from '../shared/components/events/events-list.component';
import { EventThumbnailComponent } from '../shared/components/events/event-thumbnail.component';
import { NavbarComponent } from 'src/shared/components/nav/navbar.component';
import {EventService} from "src/shared/services/event.service";
import { ToastrService } from 'src/shared/services/toastr.service';
import {appRoutes} from "../routes";
import { RouterModule } from '@angular/router';
import { EventDetailComponent } from 'src/shared/components/events/event-details/event-detail.component';
import { NewEventComponent } from 'src/shared/components/events/new-event/new-event.component';
import { EventRouteActivator } from 'src/shared/services/event-route-activator.service';
import { Error404Component } from 'src/shared/components/errors/404.component';
import { EventListResolver } from 'src/shared/services/event-list-resolver.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventThumbnailComponent,
    EventsListComponent,
    EventDetailComponent,
    NewEventComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EventService,
    ToastrService,
    EventRouteActivator,
    {provide:"canDeactivateCreateEvent",useValue:checkDirtyState},
    EventListResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function checkDirtyState(component:NewEventComponent) {
  if(component.isDirty)
    return window.confirm('You have not saved this form, do you want to cancel?');
  return true;
}