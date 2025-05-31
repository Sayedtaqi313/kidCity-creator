import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateActivityComponent } from './components/create-activity/create-activity.component';
import { DashboardLayoutComponent } from './components/dashboardLayoutComponent/dashboardLayoutComponent';
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
import { AllActivitiesComponent } from './components/all-activities/all-activities.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotificationsComponent } from './components/notifications/notification.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'all-activities',
        component: AllActivitiesComponent,
      },
      {
        path: 'create-activity',
        component: CreateActivityComponent,
      },
      {
        path: ':id/activity',
        component: ActivityDetailComponent,
      },
      {
        path: ':id/activity/edit',
        component: CreateActivityComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
