import { Router } from '@angular/router';
import { activityColors } from './../../types/activities-colors.type';
import { ActivityService } from './../../services/activity.service';
import { Component, OnInit } from '@angular/core';
import { HomeCard } from '../../types/home-card.interface';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css'],
})
export class HomeContentComponent implements OnInit {
  cards: HomeCard[] = [];
  constructor(
    private activityService: ActivityService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.cards = [
      {
        title: 'Sign In or Register',
        description:
          'Join our community of creators and providers. Sign up for free to access your dashboard and tools.',
        image: 'homecard/signup.jpg',
        tag: 'Sign In',
      },
      {
        title: 'List Your Activities',
        description:
          'Add local events or travel-based experiences. From park meetups to multi-day adventures, listing is fast and simple.',
        image: 'homecard/list.jpg',
        tag: 'List',
      },
      {
        title: 'Reach Families Instantly',
        description:
          'Your listings will appear to parents searching for fun nearby or planning for family trips.',
        image: 'homecard/reach.jpg',
        tag: 'Reach',
      },
      {
        title: 'Manage Everything with Ease',
        description:
          'Handle bookings, share updates, and stay in touch, all in one place.',
        image: 'homecard/manage.jpg',
        tag: 'Manage',
      },
    ];
  }
}
