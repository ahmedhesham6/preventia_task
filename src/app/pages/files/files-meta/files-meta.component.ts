import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import { FileService } from '../../../services/files.service';

@Component({
  selector: 'kt-admins',
  templateUrl: './files-meta.component.html',
  styleUrls: ['./files-meta.component.scss']
})
export class FileMetaComponent implements OnInit {
  allFileMeta: any[] = [];

  displayedColumns = [
    'name',
    'fileLink',
    'keywords',
    'FileType',
    'Link',
    'actions'
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  pageIndex: number = 1;
  pageSize: number = 5;
  pageSizeOptions = [5, 10, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fileService: FileService, private dialog: MatDialog) {}

  ngOnInit() {
    this.updateTable();
  }
  applyFilter(filterValue) {
    if (filterValue !== '') {
      this.fileService
        .searchFiles({
          keywords: filterValue,
          page: this.pageIndex,
          page_size: this.pageSize
        })
        .subscribe(filesMetas => {
          this.allFileMeta = filesMetas.data.FileMeta.map(f => {
            const Link: any = { type: undefined, name: undefined };

            if (f.Developer) {
              Link.type = 'Developer';
              Link.name = f.Developer.name;
            } else if (f.Project) {
              Link.type = 'Project';
              Link.name = f.Project.name;
            } else if (f.Property) {
              Link.type = 'Property';
              Link.name = f.Property.name;
            }
            return { ...f, Link };
          });
          this.dataSource.data = this.allFileMeta;
        });
    } else {
      this.fileService
        .searchFiles({
          page: this.pageIndex,
          page_size: this.pageSize
        })
        .subscribe(filesMetas => {
          this.allFileMeta = filesMetas.data.FileMeta.map(f => {
            const Link: any = { type: undefined, name: undefined };

            if (f.Developer) {
              Link.type = 'Developer';
              Link.name = f.Developer.name;
            } else if (f.Project) {
              Link.type = 'Project';
              Link.name = f.Project.name;
            } else if (f.Property) {
              Link.type = 'Property';
              Link.name = f.Property.name;
            }
            return { ...f, Link };
          });
          this.dataSource.data = this.allFileMeta;
        });
    }
  }
  // Update Table
  updateTable() {
    // this.applyFilter(
    //   (
    //     <HTMLInputElement>document.getElementById('filter') || {
    //       value: undefined
    //     }
    //   ).value
    // );
    this.applyFilter(
      (<HTMLInputElement>document.getElementById('filter')).value
    );
    if (this.pageIndex <= 1) {
      (<HTMLInputElement>document.getElementById('prevPage')).disabled = true;
    } else {
      (<HTMLInputElement>document.getElementById('prevPage')).disabled = false;
    }
    this.checkNextPage();
  }
  checkNextPage() {
    this.fileService
      .searchFiles({ page: this.pageIndex + 1, page_size: this.pageSize })
      .subscribe(filesMetas => {
        if (filesMetas.data.FileMeta.length > 0) {
          (<HTMLInputElement>(
            document.getElementById('nextPage')
          )).disabled = false;
        } else {
          (<HTMLInputElement>(
            document.getElementById('nextPage')
          )).disabled = true;
        }
      });
  }
  nextPage() {
    this.pageIndex++;
    this.updateTable();
  }
  previousPage() {
    this.pageIndex--;
    this.updateTable();
  }

  // Open Dialog
  addFile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { top: '5%' };
    dialogConfig.width = '500px';
    dialogConfig.data = { action: 'Add File' };
  }

  editFile(file) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { top: '5%' };
    dialogConfig.width = '500px';
    dialogConfig.data = {
      action: 'Edit File',
      id: file.id,
      FileType: file.FileType,
      Link: file.Link,
      Developer: file.Developer,
      Project: file.Project,
      Property: file.Property,
      developerId: file.developerId,
      projectId: file.projectId,
      propertyId: file.propertyId,
      fileLink: file.fileLink,
      fileTypeId: file.fileTypeId,
      keywords: file.keywords,
      name: file.name
    };
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  deleteFile(fileId) {
    this.fileService.deleteFile(fileId).subscribe(() => {
      this.updateTable();
    });
  }
}
