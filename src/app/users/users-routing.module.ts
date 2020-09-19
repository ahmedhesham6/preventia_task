import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersTabsComponent } from './users-tabs/users-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: UsersTabsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
