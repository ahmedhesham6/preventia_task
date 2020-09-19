import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { CRUDService } from '../_services/crud.service';
import {
  LayoutUtilsService,
  MessageType
} from '../../core/_base/crud';
import { MatPaginator } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericFormModalComponent } from '../generic-form-modal/generic-form-modal.component';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'kt-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() modelData: any;
  @Input() alert: any;
  @Input() gate: string;
  @Input() query: any;
  @Input() wizard = false;
  @Input() search = true;
  @Input() paginate = true;
  @Input() enabledTestsFlag = false;
  @Input() refreshInterval: number;
  @Output() addClickEvent = new EventEmitter<any>();
  @Output() listChanged = new EventEmitter<any>();
  @Output() customActionClickEvent = new EventEmitter<any>();
  @Output() customViewEvent = new EventEmitter<any>();

  public pageSize = 10;
  public displayedColumns: string[];
  public totalLength: number;
  public listData: object[];
  public loader: boolean;
  public Columns: any[] = [];
  public Column: string[] = [];
  public selectedItem: any;
  public refreshListner: any;
  public intervalListener: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _crudService: CRUDService,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loader = false;
    this.Columns = this.modelData.list;
    this.Columns.forEach((element) => {
      this.Column.push(element.display);
    });
    if (this.enabledTestsFlag) {
      this.getLabsFilters();
    }
    // if (this.refreshInterval > 0) {
    //   // auto refresh mode
    //   this.intervalListener = interval(this.refreshInterval * 1000)
    //     .pipe(
    //       startWith(0),
    //       switchMap(() => this.loadList())
    //     )
    //     .subscribe((res) => console.log(res));
    // } else {
      // single fetch mode
      this.loadList();
    // }
    // force refresh triggered from other components
    // this.refreshListner = this._crudService.forceRefreshValue.subscribe(
    //   (res) => {
    //     if (res) {
    //       this.loadList();
    //     }
    //   }
    // );
  }

  async getLabsFilters() {
    try {
      const labs = await this._crudService.api('/api/labs');
      const filters = labs.data.map((lab) => {
        return { label: lab.name, value: lab.id };
      });
      this.modelData.filters = [
        { label: 'Lab', options: filters, queryParam: 'lab' }
      ];
    } catch (error) {
      console.log(error);
    }
  }

  sendSearch(value) {
    this.loader = false;
    let query: any = {};
    query['searchFields'] = [];
    query['searchTerm'] = value;
    this.modelData.list.forEach((listItem) => {
      if (listItem.search) {
        if (isNaN(value) && listItem.type === 'string') {
          query['searchFields'].push(listItem.searchKey);
        } else if (!isNaN(value) && listItem.key === 'id') {
          query[listItem.searchKey] = +value;
        }
      }
    });
    query['searchFields'] = query['searchFields'].join(',');
    if (+value === 0) {
      return this.loadList();
    }
    this.loadList(query);
  }

  delete(data: any) {
    const _title: string = `${this.title} Delete`;
    const _description: string = `Are you sure to permanently delete this ${this.title}?`;
    const _waitDesciption: string = `${this.title} is  being deleted...`;
    const _deleteMessage = `${this.title} has been deleted`;
    const q = { ...{ id: data.id } };

    const dialogRef = this.layoutUtilsService.deleteElement(
      _title,
      _description,
      _waitDesciption
    );
    dialogRef.afterClosed().subscribe((res) => {
      console.log('TCL: GenericListComponent -> delete -> res', res);
      if (!res) {
        return;
      }
      this.listChanged.emit(true);
      this.listData = this.listData.filter(
        (item) => item['id'] !== data.id
      );
      this.changeDetectorRefs.detectChanges();
      this.layoutUtilsService.showActionNotification(_deleteMessage);

      // this._crudService
      //   .deleteData(this.gate, q)
      //   .then((deleteRes) => {
      //     this.listChanged.emit(true);
      //     this.layoutUtilsService.showActionNotification(
      //       _deleteMessage
      //     );
      //     this.loadList().then(() => {
      //       this.changeDetectorRefs.detectChanges();
      //     });
      //   })
      //   .catch((err) => {
      //     this.layoutUtilsService.showActionNotification(
      //       `Failed to delete ${this.title}`,
      //       MessageType.Delete
      //     );
      //     console.error(err);
      //   });
    });
  }

  handleFilterChange($event, filterObj) {
    // const eventValue = $event.target.value;
    // console.log(
    //   'GenericListComponent -> handleFilterChange -> $event.target.value',
    //   eventValue
    // );
    // if (eventValue && eventValue != 'null') {
    //   this.query[filterObj.queryParam] = eventValue;
    // } else {
    //   delete this.query[filterObj.queryParam];
    // }
    // this.loadList();
  }

  loadList(search = null) {
    this.query.skip = this.paginator.pageIndex * this.pageSize;
    this.query.limit = this.pageSize;
    let query = { ...this.query };
    if (search) {
      query = { ...search, ...this.query };
    }

    return this._crudService
      .getData(this.gate, query)
      .then((res) => {
        this.totalLength = res.count;
        this.listData = res.data || res.results || res;
        console.log(this.listData);

        this.changeDetectorRefs.detectChanges();
        this.loader = true;
      })
      .catch((err) => {
        this.layoutUtilsService.showActionNotification(
          'Could not fetch list'
        );
        console.error('Failed to load list', err);
      });
  }

  edit(item) {
    let q = {
      id: item.id
    };
    this.selectedItem = item;
    this.open(q, 'edit');
  }

  // opens edit/add modal
  open(query = {}, mode = 'add') {
    let addModeFlag = mode === 'add';
    let info = {
      title: addModeFlag ? 'Add new' : 'Edit',
      gate: this.gate,
      mode: addModeFlag ? 'add' : 'edit',
      instance: this.selectedItem
    };

    this.addClickEvent.emit(info);
    if (
      !this.modelData.externalForm ||
      (this.modelData.inlineEdit && mode === 'edit')
    ) {
      let q = { ...this.query, ...query };
      const self = this;
      const modalRef = this.modalService.open(
        this.modelData.customEditModal
          ? this.modelData.customEditModal
          : GenericFormModalComponent,
        {
          size: 'lg'
        }
      );

      modalRef.componentInstance.title = info.title;
      modalRef.componentInstance.modelData = this.modelData;
      modalRef.componentInstance.gate = this.gate;
      modalRef.componentInstance.query = q;
      modalRef.componentInstance.instanceData = addModeFlag
        ? {}
        : this.selectedItem;
      modalRef.componentInstance.wizard = this.wizard;

      // if (!this.modelData.customEditModal) {
      //   modalRef.componentInstance.notifyParentSuccess.subscribe(
      //     (res) => {

      //       // this.loadList();
      //     }
      //   );
      // }
      modalRef.result
        .then((res) => {
          if (res.id) {
            this.listData = this.listData.map((elem) => {
              return elem['id'] === res.id ? res : elem;
            });
          } else {
            res.id = this.listData.length + 1;
            console.log(res);
            this.listData = [
              ...this.listData,
              {
                ...res
              }
            ];
          }
          this.changeDetectorRefs.detectChanges();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  handleViewClick(mode, element) {
    if (mode === 'custom') {
      this.customViewEvent.emit(element);
    } else {
      if (element.order_type === 'Test')
        this.router.navigate([
          '/requests/orders/details',
          element.id
        ]);
      else if (element.order_type === 'Prescription')
        this.router.navigate([
          '/requests/prescription/details',
          element.id
        ]);
      else this.router.navigate([mode, element.id]);
    }
  }

  ngOnDestroy() {
    if (this.refreshListner) {
      this.refreshListner.unsubscribe();
    }
    if (this.intervalListener) {
      this.intervalListener.unsubscribe();
    }
  }
}
