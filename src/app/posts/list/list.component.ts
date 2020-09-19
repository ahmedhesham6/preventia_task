import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
import { CRUDService } from '../../shared/_services/crud.service';
import {
  LayoutUtilsService,
  MessageType
} from '../../core/_base/crud';

@Component({
  selector: 'kt-albums-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public POSTS_END_POINT: string = 'users/1/posts';
  public listData: object[];
  public COMM_END_POINT: string = 'posts';
  public commentsData: object[];
  public loader: boolean;

  constructor(
    private crudService: CRUDService,
    private changeDetectorRefs: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal
  ) {}

  open(content, postID) {
    this.modalService.open(content, {
      size: 'lg'
    });
    this.loader = false;
    this.changeDetectorRefs.detectChanges();
    this.loadComments(postID);
  }

  loadList() {
    return this.crudService
      .getData(this.POSTS_END_POINT, {})
      .then((res) => {
        this.listData = res.data || res.results || res;
        console.log(this.listData);

        this.loader = true;
        this.changeDetectorRefs.detectChanges();
        console.log(this.loader);
      })
      .catch((err) => {
        this.layoutUtilsService.showActionNotification(
          'Could not fetch list'
        );
        console.error('Failed to load list', err);
      });
  }

  loadComments(id) {
    return this.crudService
      .getData(this.COMM_END_POINT + `/${id}/comments`, {})
      .then((res) => {
        this.commentsData = res.data || res.results || res;
        this.loader = true;
        this.changeDetectorRefs.detectChanges();
        console.log({ ...this.commentsData });

        this.changeDetectorRefs.detectChanges();
      })
      .catch((err) => {
        this.layoutUtilsService.showActionNotification(
          'Could not fetch comments'
        );
        console.error('Failed to load comments', err);
      });
  }

  ngOnInit() {
    this.loader = false;
    this.loadList();
  }
}
