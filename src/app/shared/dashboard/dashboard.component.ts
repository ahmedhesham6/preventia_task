import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CRUDService } from '../_services/crud.service';
import { LayoutUtilsService } from '../../core/_base/crud';

@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public statsMap;
  public profitsData;
  constructor(
    private _crudService: CRUDService,
    private layoutService: LayoutUtilsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchStats();
  }

  fetchStats() {
    this._crudService
      .api('/api/app/statistics', {}, 'GET')
      .then((res) => {
        this.statsMap = res;
        console.log(
          'DashboardComponent -> fetchStats -> this.statsMap',
          this.statsMap
        );
        this.cd.detectChanges();
        this.profitsData = [
          {
            title: 'Total Orders',
            desc: 'Total Order requested from Patient APP',
            value: this.statsMap.total_orders + ' Order',
            valueClass: 'kt-font-brand'
          },
          {
            title: 'Total Income',
            desc: 'Total Order prices (not including tax)',
            value: this.statsMap.total_price + ' EGP',
            valueClass: 'kt-font-success'
          },
          {
            title: 'Complaint Reports',
            desc: 'Reports issued by customers',
            value: this.statsMap.total_reports + ' Report',
            valueClass: 'kt-font-danger'
          }
        ];
      })
      .catch((err) => {
        this.layoutService.showActionNotification(
          'Failed to fetch statistics'
        );
      });
  }
}
