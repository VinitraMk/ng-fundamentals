import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventsListComponent } from '../components/events/events-list.component';
import { EventThumbnailComponent } from '../components/events/event-thumbnail.component';
import { NavbarComponent } from 'src/components/nav/navbar.component';
import {EventService} from "../services/event.service";
import { ToastrService } from 'src/services/toastr.service';
import {appRoutes} from "../routes";
import { RouterModule } from '@angular/router';
import { EventDetailComponent } from 'src/components/events/event-details/event-detail.component';
import { NewEventComponent } from 'src/components/events/new-event/new-event.component';
import { EventRouteActivator } from 'src/services/event-route-activator.service';
import { Error404Component } from 'src/components/errors/404.component';
import { EventListResolver } from 'src/services/event-list-resolver.service';
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