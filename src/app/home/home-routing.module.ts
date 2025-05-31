import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from '../core/components/about/about.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'about-su',
    component: AboutComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
