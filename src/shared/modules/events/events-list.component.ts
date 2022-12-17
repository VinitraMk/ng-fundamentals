import {Component, OnInit} from '@angular/core';
import { IEvent } from 'src/shared/models/event.model';
import { EventService } from 'src/shared/services/event.service';

declare let toastr

@Component({
    template:`
        <h1 class="page-name">Upcoming Angular Events</h1>
        <hr>
        <div class="row">
            <div class="col-md-5" *ngFor="let event of events">
                <event-thumbnail  [event]="event" #thumbnail></event-thumbnail>
            </div>
        </div>
    `
})
export class EventsListComponent implements OnInit{
  events:IEvent[];
   constructor(private eventService:EventService) {
   } 

   ngOnInit() {
     this.eventService.getEvents().subscribe((events)=>{
         this.events = events; 
     });
   }
    
} 