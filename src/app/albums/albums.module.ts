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
import { SharedModule } from '../shared/shared.module';

// Modules Components
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { AlbumsRoutingModule } from './albums-routing.module';

// Is Imported in theme.module

@NgModule({
  declarations: [DetailsComponent, ListComponent],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
    CoreModule,
    PartialsModule,
    AlbumsRoutingModule
  ],
  providers: []
})
export class AlbumsModule {}
