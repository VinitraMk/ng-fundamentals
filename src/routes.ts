import {Routes} from "@angular/router";
import { EventsListComponent } from './components/events/events-list.component';
import { EventDetailComponent } from './components/events/event-details/event-detail.component';
import { NewEventComponent } from './components/events/new-event/new-event.component';
import { Error404Component } from './components/errors/404.component';
import { EventRouteActivator } from './services/event-route-activator.service';
import { EventListResolver } from './services/event-list-resolver.service';

export const appRoutes:Routes = [
    {path:'events/new',component:NewEventComponent, canDeactivate:["canDeactivateCreateEvent"]},
    {path:'events',component:EventsListComponent,resolve:{events:EventListResolver}},
    {path:'events/:id',component:EventDetailComponent, canActivate: [EventRouteActivator]},
    {path:'404',component:Error404Component},
    {path:'',redirectTo:'/events',pathMatch:'full'},
]