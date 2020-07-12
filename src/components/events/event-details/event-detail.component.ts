import {Component} from "@angular/core";
import {EventService} from "../../../services/event.service";
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './event-details.component.html'
})

export class EventDetailComponent {
    event:any;

    constructor(private eventService:EventService,private route:ActivatedRoute) {

    }

    ngOnInit() {
        this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    }

}