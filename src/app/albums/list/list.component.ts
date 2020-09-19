import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CRUDService } from '../../shared/_services/crud.service';
import { LayoutUtilsService } from '../../core/_base/crud';

@Component({
  selector: 'kt-albums-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public END_POINT: string = 'users/1/albums';
  public listData: object[];
  public loader: boolean;

  constructor(
    private crudService: CRUDService,
    private changeDetectorRefs: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService
  ) {}

  loadList() {
    return this.crudService
      .getData(this.END_POINT, {})
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
    this.loadList();
  }
}
