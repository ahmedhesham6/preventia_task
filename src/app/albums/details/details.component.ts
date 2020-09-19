import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CRUDService } from '../../shared/_services/crud.service';
import { LayoutUtilsService } from '../../core/_base/crud';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public END_POINT: string = 'photos';
  public listData: object[];
  public albumID: string;
  public loader: boolean;

  constructor(
    private crudService: CRUDService,
    private changeDetectorRefs: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    private route: ActivatedRoute
  ) {}

  loadList() {
    return this.crudService
      .getData(this.END_POINT, { albumId: this.albumID })
      .then((res) => {
        this.listData = res.data || res.results || res;
        console.log(this.listData);

        this.loader = true;
        this.changeDetectorRefs.detectChanges();
      })
      .catch((err) => {
        this.layoutUtilsService.showActionNotification(
          'Could not fetch list'
        );
        console.error('Failed to load list', err);
      });
  }

  ngOnInit() {
    this.loader = false;
    this.albumID = this.route.snapshot.paramMap.get('id');
    this.loadList();
  }
}
