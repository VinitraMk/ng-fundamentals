import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector:'event-thumbnail',
    template: `
        <div [routerLink]="['/events',event.id]" class="thumbnail">
            <h2>{{event?.name}}</h2>
            <div>Date: {{event?.name}}</div>
            <div [ngClass]="getTimeStartClass()" [ngSwitch]="event?.time">
                Time: {{event?.time}}
                <span *ngSwitchCase = "'8:00 am'">(Early Start)</span>
                <span *ngSwitchCase = "'10:00 am'">(Late Start)</span>
                <span *ngSwitchDefault>(Normal Start)</span>
            </div>
            <div>Price: \${{event?.price}}</div>
            <div *ngIf="event?.location">
                <span>Location: {{event?.location?.address}},</span>
                <span class="p-l-1">{{event?.location?.city}},</span>
                <span class="p-l-1">{{event?.location?.country}}</span>
            </div>
            <div *ngIf="event?.onlineUrl">
                Online Url: {{event?.onlineUrl}}
            </div>
        </div>
    `
})

export class EventThumbnailComponent {
    @Input() event:any;
    someProperty:string = "value";
    logFoo() {
        console.log("foo");
    }

    getTimeStartClass() {
        const timeObj = this.event && this.event.time === '8:00 am';
        return {
            'fc--green':timeObj,
            'fw-bold':timeObj
        }
    }
}