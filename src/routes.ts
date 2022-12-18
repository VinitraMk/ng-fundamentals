import {Routes} from "@angular/router";
import { EventsListComponent, EventDetailComponent, NewEventComponent, CreateSessionComponent, EditEventComponent } from './shared/modules/events';
import { Error404Component } from './shared/modules/errors/404.component';
import { EventRouteActivator } from './shared/services/event-route-activator.service';
import { EventListResolver } from './shared/services/event-list-resolver.service';
import { EventResolver } from "./shared/services";

export const appRoutes:Routes = [
    {path:'events/new',component:NewEventComponent, canDeactivate:["canDeactivateCreateEvent"]},
    {path:'events/edit/:id',component:EditEventComponent, canDeactivate:["canDeactivateCreateEvent"]},
    {path:'events',component:EventsListComponent,resolve:{events:EventListResolver}},
    {path:'events/:id',component:EventDetailComponent, resolve: {event: EventResolver}},
    {path: 'events/session/new', component: CreateSessionComponent},
    {path:'404',component:Error404Component},
    {path:'',redirectTo:'/events',pathMatch:'full'},
    {path:'user',loadChildren: () => import('./shared/modules/user/user.module').then(m => m.UserModule)}
]