import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ISession } from "src/shared/models/event.model";

@Component({
    selector: 'create-session',
    templateUrl: 'create-session.component.html',
    styles: [`
    em {float:right; color:#e05c65; padding-left:10px;}
    .error input, .error textarea, .error select { background-color: #e3c3c5; }
    .error ::-webkit-input-laceholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})

export class CreateSessionComponent implements OnInit {
    name: FormControl;
    presenter: FormControl;
    duration: FormControl;
    level: FormControl;
    abstract: FormControl;
    newSessionForm: FormGroup;
    @Output() saveNewSession = new EventEmitter()
    @Output() cancelNewSession = new EventEmitter();

    ngOnInit(): void {
        this.name = new FormControl('', Validators.required);
        this.presenter = new FormControl('', Validators.required);
        this.duration = new FormControl('', Validators.required);
        this.level = new FormControl('', Validators.required);
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400),this.restrictedWords(['foo', 'bar'])]);
        this.newSessionForm = new FormGroup({
            name: this.name, 
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }

    cancel() {
        this.cancelNewSession.emit();
    }

    saveSession(formValues) {
        let session: ISession = {
            id: undefined,
            name: formValues.name,
            duration: +formValues.duration,
            level: formValues.level,
            presenter: formValues.presenter,
            abstract: formValues.abstract,
            voters: []
        }
        this.saveNewSession.emit(session);
    }

    private restrictedWords(words: string[]) {
        return (control: FormControl) : {[key: string]: any} => {
            if (!words) return null;
            var invalidWords = words.map(x => control.value.includes(x) ? x : null)
            .filter(x => x!== null)
            return invalidWords && invalidWords.length > 0 ? { 'restrictedWords': invalidWords.join(',')} : null;
        }
    }
}