import { Component, OnInit } from '@angular/core';
import { Sparkles } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  isLoggedInSubs!: Subscription;
  isLoggedIn: boolean = false;
  isInit: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedInSubs = this.authService.isAuthenticatedSubject
      .pipe()
      .subscribe((status) => {
        if (status !== null) {
          this.isLoggedIn = status;
          this.isInit = true;
        }
      });
  }

  ngOnInit(): void {}
  scrollToHomeContent(): void {
    const homeContent = document.getElementById('home-content');
    if (homeContent) {
      homeContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  navigate() {
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard', 'create-activity']);
    } else {
      this.router.navigate(['/auth', 'signin']);
    }
  }
}
