import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../../core/services/activity.service';
import { DialogService } from '../../../core/services/dialog.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css'],
})
export class ActivityDetailComponent implements OnInit {
  activity: any;
  edit: boolean = false;
  originalActivity: any;
  isLoading: boolean = false;
  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.isLoading = true;
    this.activityService.getActivityById(id).subscribe({
      next: (res) => {
        this.activity = res;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
  navigateToEdit(id: string) {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  deleteActivity(id: string) {
    this.dialogService
      .show('Are you sure want delete this activity!', 'warning')
      .then((res) => {
        if (res) {
          this.activityService.deleteActivity(id);
        } else {
          return;
        }
      });
  }
}
