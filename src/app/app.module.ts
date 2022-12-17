import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EventsListComponent, EventThumbnailComponent, EventDetailComponent,
  EditEventComponent, NewEventComponent, SessionListComponent,
  CreateSessionComponent } from '../shared/modules/events';
import { NavbarComponent } from 'src/shared/modules/nav/navbar.component';
import {EventService} from "src/shared/services/event.service";
import { ToastrService } from 'src/shared/services/toastr.service';
import {appRoutes} from "../routes";
import { RouterModule } from '@angular/router';
import { EventRouteActivator } from 'src/shared/services/event-route-activator.service';
import { Error404Component } from 'src/shared/modules/errors/404.component';
import { EventListResolver } from 'src/shared/services/event-list-resolver.service';
import { AuthService } from 'src/shared/modules/user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapsiblePanelComponent } from 'src/shared/components';
import { DurationPipe } from 'src/shared/pipes';

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
    DurationPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EventService,
    ToastrService,
    EventRouteActivator,
    {provide:"canDeactivateCreateEvent",useValue:checkDirtyState},
    EventListResolver,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function checkDirtyState(component:NewEventComponent) {
  if(component.isDirty)
    return window.confirm('You have not saved this form, do you want to cancel?');
  return true;
}