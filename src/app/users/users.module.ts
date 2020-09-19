import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PartialsModule } from '../partials/partials.module';
import { UsersTabsComponent } from './users-tabs/users-tabs.component';


@NgModule({
  declarations: [
    UsersTabsComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    PartialsModule
  ],
})
export class UsersModule {}
