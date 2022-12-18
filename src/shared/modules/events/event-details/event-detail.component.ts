import {Component, OnInit } from "@angular/core";
import {EventService} from "../../../services/event.service";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { IEvent, ISession } from "src/shared/models/event.model";

@Component({
    templateUrl: './event-details.component.html'
})

export class EventDetailComponent implements OnInit {
    event:IEvent;
    addMode:boolean = false;
    filterBy: string = 'all';
    sortBy: string = 'name';

    constructor(private eventService:EventService,private route:ActivatedRoute, private router: Router) {

    }

    resetState() {
        this.addMode = false;
        this.sortBy = 'name';
        this.filterBy = 'all'
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.event = this.eventService.getEvent(+params['id']);
            this.resetState()
        })
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