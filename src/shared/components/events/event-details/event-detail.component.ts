import {Component} from "@angular/core";
import {EventService} from "../../../services/event.service";
import { ActivatedRoute } from '@angular/router';
import { IEvent } from "src/shared/models/event.model";

@Component({
    templateUrl: './event-details.component.html'
})

export class EventDetailComponent {
    event:IEvent;

    constructor(private eventService:EventService,private route:ActivatedRoute) {

    }

    ngOnInit() {
        this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    }

}