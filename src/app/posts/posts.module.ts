// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../core/core.module';

// Modules Components
import { ListComponent } from './list/list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';

// Is Imported in theme.module

@NgModule({
  declarations: [ListComponent],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
    CoreModule,
    PartialsModule,
    PostsRoutingModule
  ],
  providers: []
})
export class PostsModule {}
