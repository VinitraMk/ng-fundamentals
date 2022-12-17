import {Component} from "@angular/core";
import {EventService} from "../../../services/event.service";
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent, ISession } from "src/shared/models/event.model";

@Component({
    templateUrl: './event-details.component.html'
})

export class EventDetailComponent {
    event:IEvent;
    addMode:boolean = false;
    filterBy: string = 'all';
    sortBy: string = 'name';

    constructor(private eventService:EventService,private route:ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    }

    handleEditClick(eventId: number) {
        this.router.navigate([`/events/edit/${eventId}`])
    }

    addSession() {
        this.addMode = true;
    }

    cancelNewSession() {
        this.addMode = false;
    }

    saveNewSession(session: ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this.eventService.updateEvent(this.event)
        this.addMode = false;
    }

}