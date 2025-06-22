import { NotificationsService } from './core/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private notificationsService: NotificationsService
  ) {
    this.authService.autoLogin();
  }
  title = 'KidsCity-Creator';
  ngOnInit(): void {
    this.notificationsService.initialize();
  }
}
