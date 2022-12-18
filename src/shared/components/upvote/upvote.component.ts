import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'upvote',
    templateUrl: './upvote.component.html',
    styleUrls: ['./upvote.component.scss']
})

export class UpvoteComponent {
    @Input() count: number;
    @Input() set voted(val:boolean) {
        this.voteClass = val ? 'voted' : '';
    };
    @Output() vote = new EventEmitter();
    voteClass;

    onVotingClick() {
        this.vote.emit(null);
    }
}