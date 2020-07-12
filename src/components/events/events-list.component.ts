import {Component, OnInit} from '@angular/core';
import { EventService } from 'src/services/event.service';
import {ToastrService} from "src/services/toastr.service";

declare let toastr

@Component({
    template:`
        <h1>Upcoming Angular Events</h1>
        <hr>
        <div class="row">
            <div class="col-md-5" *ngFor="let event of events">
                <event-thumbnail  [event]="event" #thumbnail></event-thumbnail>
            </div>
        </div>
        <button class="btn btn-primary" (click)="thumbnail.logFoo()">Click Here</button>
    `
})
export class EventsListComponent implements OnInit{
  events:any;
   constructor(private eventService:EventService, private toastrService:ToastrService) {
   } 

   ngOnInit() {
     this.eventService.getEvents().subscribe((events)=>{
         this.events = events; 
     });
   }
    
} 