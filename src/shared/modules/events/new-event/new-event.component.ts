import {Component} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {Router} from "@angular/router";
import { EventService } from "src/shared/services/event.service";

@Component({
    templateUrl:'./new-event.component.html',
    styles: [`
    em {float:right; color:#e05c65; padding-left:10px;}
    .error input { background-color: #e3c3c5; }
    .error ::-webkit-input-laceholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error :ms-input-placeholder { color: #999; }
  `]

})

export class NewEventComponent {
    isDirty:boolean = true;
    ngForm: FormGroup;
    newEvent;
    constructor(private router:Router, private eventService: EventService) {
    }

    cancel() {
        this.router.navigate(['/events'])
    }

    saveEvent(formValues): void {
        this.eventService.saveEvent(formValues);
        this.isDirty = false;
        this.router.navigate(['/events'])
    }
}