import { activityColors } from './../../../core/types/activities-colors.type';
import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../core/services/activity.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../core/services/snackbar.service';
@Component({
  selector: 'app-all-activities',
  templateUrl: './all-activities.component.html',
  styleUrl: './all-activities.component.css',
})
export class AllActivitiesComponent implements OnInit {
  activities: any[] = [];
  activityColors = activityColors;
  isLoading: boolean = false;
  constructor(
    private activityService: ActivityService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.activityService.getAllActivities().subscribe({
      next: (res) => {
        this.activities = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.snackbarService.openSnackbar(err.error.message, 'bg-warning');
        this.isLoading = false;
      },
    });
  }
  navigateToDetail(id: string) {
    this.router.navigate(['dashboard', id, 'activity']);
  }
  navigateToEdit(id: string) {
    this.router.navigate(['dashboard', id, 'activity', 'edit']);
  }

  navigateToCreate() {
    this.router.navigate(['dashboard', 'create-activity']);
  }
}
