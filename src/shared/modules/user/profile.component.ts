import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Toastr, TOASTR_TOKEN } from 'src/shared/services/toastr.service';
import { AuthService } from './auth.service';

@Component({
  templateUrl: 'profile.component.html',
  styles: [`
    em {float:right; color:#e05c65; padding-left:10px;}
    .error input { background-color: #e3c3c5; }
    .error ::-webkit-input-laceholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent implements OnInit {
    private profileForm: FormGroup;
    private firstName: FormControl;
    private lastName: FormControl;


    constructor(private authService: AuthService, private router: Router, @Inject(TOASTR_TOKEN) private toastr:Toastr) {}

    ngOnInit(): void {
        this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[A-Za-z].*')]);
        this.lastName = new FormControl(this.authService.currentUser.lastName, [Validators.required, Validators.pattern('[A-Za-z].*')]);
        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName
        })
    }

    cancel() {
        this.router.navigate(['events'])
    }

    logout() {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/user/login']);
        })
    }

    saveProfile(formValues) {
        if (this.profileForm.valid) {
            this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
            .subscribe(res => {
                this.router.navigate(['events'])
                this.toastr.success('', 'Profile saved successfully')
            });
        }
    }

    validateLastName() {
        return this.lastName.touched || this.lastName.valid;
    }

    validateFirstName() {
        return this.firstName.touched || this.firstName.valid;
    }
}