import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import { EventService } from 'src/shared/services/event.service';

@Injectable()
// activator removed when observables were introduced for storing data.

export class EventRouteActivator implements CanActivate {
    constructor(private eventService:EventService, private router:Router) {

    }

    canActivate(route:ActivatedRouteSnapshot) {
        const eventExists = !!this.eventService.getEvent(+route.params['id']);

        if(!eventExists) {
            this.router.navigate(['/404'])
        }
        return eventExists;
    }
}