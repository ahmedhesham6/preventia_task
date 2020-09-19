import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CRUDService } from '../../shared/_services/crud.service';
import { LayoutUtilsService } from '../../core/_base/crud';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-users-tabs',
  templateUrl: './users-tabs.component.html',
  styleUrls: ['./users-tabs.component.scss']
})
export class UsersTabsComponent implements OnInit {
  public authQuery = {};
  public authAPI = 'users';
  public title = 'Auth';

  public authModel: any = {
    form: {
      wrapperKey: 'auth',
      type: 'special',
      endPoint: 'api/users',
      httpMethod: 'POST',
      groups: [
        {
          title: 'User Data',
          inputs: [
            {
              name: 'Name',
              type: 'string',
              gate: 'name',
              required: true
            },
            {
              name: 'Email',
              type: 'string',
              gate: 'email',
              email: true,
              required: true
            },
            {
              name: 'Phone',
              type: 'string',
              gate: 'phone',
              required: false
            }
          ]
        }
      ]
    },

    list: [
      {
        display: 'ID',
        type: 'number',
        key: 'id',
        search: true,
        searchKey: 'id'
      },
      {
        display: 'Name',
        type: 'string',
        key: 'name'
      },
      {
        display: 'Email',
        type: 'string',
        key: 'email',
        search: true,
        searchKey: 'email'
      },
      {
        display: 'Phone',
        type: 'number',
        key: 'phone'
      },
      {
        display: 'Actions',
        type: 'array',
        key: '',
        actions: {
          delete: true,
          view: false,
          edit: true
          // custom: {
          //   label: 'Verify',
          //   icon: 'check',
          //   disableKey: 'verified'
          // }
        }
      }
    ]
  };

  constructor(
    private modalService: NgbModal,
    private _crudService: CRUDService,
    private layoutUtils: LayoutUtilsService
  ) {}

  ngOnInit() {}
}
