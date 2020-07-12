import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    templateUrl:'./new-event.component.html',

})

export class NewEventComponent {
    isDirty:boolean = true;
    constructor(private router:Router) {

    }

    cancel() {
        this.router.navigate(['/events'])
    }
}