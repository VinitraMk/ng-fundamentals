import { Component, Input } from "@angular/core";
import { ISession } from "src/shared/models/event.model";

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html',
    styles: []
})

export class SessionListComponent {
    @Input() sessions: ISession[]
}

