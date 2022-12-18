import { Component, Input, OnChanges } from "@angular/core";
import { ISession } from "src/shared/models/event.model";
import { SortAsc } from "src/shared/services/utilities";
import { AuthService } from "../../user/auth.service";
import { VoterService } from "../services/voter.service";

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html',
    styles: []
})

export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[]
    @Input() filterBy: string;
    @Input() sortBy: string;
    visibleSessions: ISession[];

    constructor(private voterService: VoterService, private authService: AuthService) {}

    ngOnChanges() {
        if(this.sessions) {
            this.filterSessions(this.filterBy);
            if (this.sortBy === 'votes') {
                this.visibleSessions.sort(this.sortDescByVotes)
            } else {
                this.visibleSessions.sort((a, b) => SortAsc(a, b, this.sortBy))
            }
        }
    }

    toggleVote(session) {
        if (this.userHasVoted(session)) {
            this.voterService.deleteVoter(session);
        } else {
            this.voterService.addVoter(session);
        }

        if (this.sortBy === 'votes') {
            this.visibleSessions.sort(this.sortDescByVotes);
        }
    }

    
    userHasVoted(session: ISession) {
        return this.voterService.userHasVoted(session);
    }

    isUserAuthenticated() {
        return this.authService.isAuthenticated();
    }

    private filterSessions(filter) {
        if (filter === 'all') {
            this.visibleSessions = this.sessions.slice(0);
        }
        else {
            this.visibleSessions = this.sessions.filter(x => x.level.toLowerCase() === filter);
        }
    }

    private sortDescByVotes(s1:ISession, s2:ISession) {
        return s2.voters.length - s1.voters.length;
    }
}

