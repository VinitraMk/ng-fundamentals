import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/modules/user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-fundamentals';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkAuthenticationStatus();
  }
}
