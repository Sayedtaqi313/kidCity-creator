import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CoreModule } from '../core/core.module';
import { CreateActivityComponent } from './components/create-activity/create-activity.component';
import { DashboardLayoutComponent } from './components/dashboardLayoutComponent/dashboardLayoutComponent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
import { AllActivitiesComponent } from './components/all-activities/all-activities.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotificationsComponent } from './components/notifications/notification.component';

@NgModule({
  declarations: [
    CreateActivityComponent,
    DashboardLayoutComponent,
    ActivityDetailComponent,
    AllActivitiesComponent,
    ProfileComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CreateActivityComponent,
    DashboardLayoutComponent,
    ActivityDetailComponent,
    AllActivitiesComponent,
    ProfileComponent,
    NotificationsComponent,
  ],
})
export class DashboardModule {}
