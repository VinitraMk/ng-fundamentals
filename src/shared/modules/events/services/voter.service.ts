import { Injectable } from "@angular/core";
import { ISession } from "src/shared/models/event.model";
import { EventService } from "src/shared/services";
import { AuthService } from "../../user/auth.service";

@Injectable()
export class VoterService {

    constructor(private eventService: EventService, private authService: AuthService) {}

    userHasVoted(session:ISession) {
        return session.voters.some(v => v === this.authService.currentUser.userName);
    }

    deleteVoter(session: ISession) {
        session.voters = session.voters.filter(v => v !== this.authService.currentUser.userName)
    }

    addVoter(session : ISession) {
        return session.voters.push(this.authService.currentUser.userName);
    }
}