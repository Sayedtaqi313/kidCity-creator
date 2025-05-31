import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SnackbarService } from './snackbar.service';
import { map, tap } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private location: Location,
    private router: Router
  ) {}

  appUrl = environment.appUrl;
  fileUrl = environment.fileUrl;
  createActivity(formData: any) {
    return this.http.post<any>(`${this.appUrl}/activities/create`, formData);
  }

  getAllActivities() {
    return this.http.get<any>(`${this.appUrl}/activities`).pipe(
      map((res) => {
        res.forEach((activity: any) => {
          activity.location = this.formatLocation(activity.location);
          activity.imageUrl = `${this.fileUrl}/${activity.imageUrl}`;
          activity.created_at = this.timeAgo(activity.created_at);
        });
        return res;
      })
    );
  }
  getActivityById(id: string) {
    return this.http.get<any>(`${this.appUrl}/activities/${id}/activity`).pipe(
      map((activity: any) => {
        activity.imageUrl = `${this.fileUrl}/${activity.imageUrl}`;
        activity.created_at = this.timeAgo(activity.created_at);
        return activity;
      })
    );
  }
  updateActivity(formData: any, id: string) {
    return this.http
      .put<any>(`${this.appUrl}/activities/${id}/activity/update`, formData)
      .pipe(
        tap((res) => {
          this.snackbarService.openSnackbar(res.message, 'bg-success');
        })
      );
  }
  deleteActivity(id: string) {
    this.http
      .delete<void>(`${this.appUrl}/activities/${id}/activity/delete`)
      .subscribe({
        next: (res) => {
          this.snackbarService.openSnackbar(
            'Activity deleted Successfully',
            'bg-success'
          );
          this.router.navigate(['/dashboard', 'all-activities']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  formatLocation(location: string) {
    const parts = location.split(',').map((part) => part.trim());

    if (parts.length < 2) return location;

    const city = parts[0];
    const country = parts[parts.length - 1];

    return `${city}, ${country}`;
  }

  timeAgo(date: Date) {
    const now = new Date();
    const timeDate = new Date(date);
    const seconds = Math.floor((now.getTime() - timeDate.getTime()) / 1000);

    const intervals = [
      { label: 'second', value: 60 },
      { label: 'minute', value: 60 },
      { label: 'hour', value: 24 },
      { label: 'day', value: 30 },
      { label: 'month', value: 12 },
      { label: 'year', value: Infinity },
    ];

    let intervalIndex = 0;
    let interval = intervals[intervalIndex];
    let time = seconds;

    while (time >= interval.value) {
      time = Math.floor(time / interval.value);
      intervalIndex++;
      interval = intervals[intervalIndex];
    }

    const timeString = `${time} ${interval.label}${time > 1 ? 's' : ''} ago`;

    return timeString;
  }
}
