import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../../core/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  private subs = new Subscription();
  isLoading: boolean = false;

  constructor(
    private notificationsService: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notificationsService.initialize();
    this.subs.add(
      this.notificationsService.notifications$.subscribe((list) => {
        this.notifications = list;
      })
    );
  }

  handleAccept(id: string) {
    this.notificationsService.handleAccept(id);
  }

  handleReject(id: string) {
    this.notificationsService.handleReject(id);
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/dashboard', id, 'activity']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
