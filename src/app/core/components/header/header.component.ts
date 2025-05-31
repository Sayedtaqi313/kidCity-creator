import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { distinctUntilChanged, map, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isSidebarOpen = false;
  isProfileMenuOpen = false;
  filters = {
    ageRange: '',
    city: '',
    activityType: '',
  };

  isLoggedIn: boolean = false;
  isLoggedInSubs!: Subscription;
  isInit: boolean = false;
  isMenuOpen: boolean = false;
  count: number = 0;
  notSubscription!: Subscription;
  user: any;
  notificationCount$!: Observable<number>;
  constructor(
    public authService: AuthService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}
  ngOnInit() {
    this.notificationCount$ = this.notificationsService.count$;
    this.isLoggedInSubs = this.authService.isAuthenticatedSubject
      .pipe()
      .subscribe((status) => {
        if (status !== null) {
          this.isLoggedIn = status;
          this.isInit = true;
        }
      });

    this.user = this.authService.getUser();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const profileButton = document.getElementById('profile-button');
    const profileMenu = document.getElementById('profile-menu');

    if (
      !profileButton?.contains(event.target as Node) &&
      !profileMenu?.contains(event.target as Node)
    ) {
      this.isProfileMenuOpen = false;
    }
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onScroll(scrolled: boolean) {
    this.isScrolled = scrolled;
  }

  logout() {
    this.authService.logout();
    this.isProfileMenuOpen = false;
    this.isSidebarOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProfileMenu(event: Event) {
    event.stopPropagation();
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSubs) {
      this.isLoggedInSubs.unsubscribe();
    }

    if (this.notSubscription) {
      this.notSubscription.unsubscribe();
    }
  }

  navigateToProfile() {
    this.toggleSidebar();
    this.router.navigate(['/dashboard', 'profile']);
  }
}
