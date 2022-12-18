import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ISession } from "src/shared/models/event.model";
import { EventService } from "src/shared/services";
import { AuthService } from "../../user/auth.service";

@Injectable()
export class VoterService {

    constructor(private eventService: EventService, private authService: AuthService, private http: HttpClient) {}

    userHasVoted(session:ISession) {
        return session.voters.some(v => v === this.authService.currentUser.userName);
    }

    deleteVoter(eventId: number, session: ISession) {
        session.voters = session.voters.filter(v => v !== this.authService.currentUser.userName)
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${this.authService.currentUser.userName}`;
        this.http.delete(url)
        .pipe(catchError(this.handleError('deleteVoter')))
        .subscribe();
    }

    addVoter(eventId: number, session : ISession) {
        session.voters.push(this.authService.currentUser.userName);
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${this.authService.currentUser.userName}`;
        const options = { headers : new HttpHeaders({'Content-Type': 'application/json'})};
        this.http.post(url, {}, options)
        .pipe(catchError(this.handleError('addVoter')))
        .subscribe();
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);
            return of(result as T);
        }
    }
}