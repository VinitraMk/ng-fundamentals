import {Routes} from "@angular/router";
import { EventsListComponent } from './shared/components/events/events-list.component';
import { EventDetailComponent } from './shared/components/events/event-details/event-detail.component';
import { NewEventComponent } from './shared/components/events/new-event/new-event.component';
import { Error404Component } from './shared/components/errors/404.component';
import { EventRouteActivator } from './shared/services/event-route-activator.service';
import { EventListResolver } from './shared/services/event-list-resolver.service';

export const appRoutes:Routes = [
    {path:'events/new',component:NewEventComponent, canDeactivate:["canDeactivateCreateEvent"]},
    {path:'events',component:EventsListComponent,resolve:{events:EventListResolver}},
    {path:'events/:id',component:EventDetailComponent, canActivate: [EventRouteActivator]},
    {path:'404',component:Error404Component},
    {path:'',redirectTo:'/events',pathMatch:'full'},
]