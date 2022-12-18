import {Component, OnInit} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { IEvent } from "src/shared/models/event.model";
import { EventService } from "src/shared/services/event.service";

@Component({
    templateUrl:'./edit-event.component.html',
    styles: [`
    em {float:right; color:#e05c65; padding-left:10px;}
    .error input { background-color: #e3c3c5; }
    .error ::-webkit-input-laceholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error :ms-input-placeholder { color: #999; }
  `]

})

export class EditEventComponent implements OnInit {
    isDirty:boolean = true;
    ngForm: FormGroup;
    public newEvent: IEvent;
    constructor(private router:Router, private eventService: EventService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        let eventId = +this.route.snapshot.params['id'];
        this.eventService.getEvent(eventId).subscribe((event: IEvent) => {
            this.newEvent = event;
        })
    }

    cancel() {
        this.router.navigate(['/events'])
    }

    updateEvent(formValues): void {
        this.newEvent = Object.assign({}, this.newEvent, {
            ...formValues
        })
        console.log(this.newEvent)
        this.eventService.saveEvent(this.newEvent).subscribe();
        this.isDirty = false;
        this.router.navigate(['/events'])
    }
}