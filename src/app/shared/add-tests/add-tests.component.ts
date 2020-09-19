import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CRUDService } from '../_services/crud.service';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl
} from '@angular/forms';
import { LayoutUtilsService } from '../../core/_base/crud';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// Generic component to "select" tests and notify its parent
@Component({
  selector: 'kt-add-tests',
  templateUrl: './add-tests.component.html',
  styleUrls: ['./add-tests.component.scss']
})
export class AddTestsComponent implements OnInit {
  @Input() query;
  @Input() fetchAPI;
  @Output() notifyParent = new EventEmitter<any>();
  filteredOptions: Observable<string[]>;
  public formData: any[];
  public formGroup: FormGroup;
  public title: string = 'Add Test';
  public loading: boolean;
  public nonAddedTests;
  public selectedTests = [];
  myControl = new FormControl();
  public testsForm = new FormGroup({
    tests: new FormArray([])
  });

  constructor(
    public activeModal: NgbActiveModal,
    private _crudService: CRUDService,
    private layoutUtilsService: LayoutUtilsService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addTestItem();
    this.loading = true;
    console.log(
      'AddTestsComponent -> ngOnInit -> this.query',
      this.query
    );

    this._crudService
      .getData(this.fetchAPI || 'tests', this.query)
      .then((cerRes) => {
        this.loading = false;
        this.nonAddedTests = cerRes.data;
      })
      .catch((err) => {
        // TODO: handle ERROR
        this.layoutUtilsService.showActionNotification(
          'Failed to fetch tests, kindly refresh'
        );
        this.loading = false;
        console.error(err);
      });
  }

  private _filter(value: any): string[] {
    console.log('AddTestsComponent -> value', value);
    console.log(
      'AddTestsComponent -> this.selectedTests',
      this.selectedTests
    );
    if (typeof value !== 'string') return;
    const filterValue = value.toLowerCase();

    return this.nonAddedTests.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(opt: any): string {
    console.log('AddTestsComponent -> displayFn -> opt', opt);
    return opt && opt.name ? opt.name : '';
  }

  /*############### Add Dynamic Elements ###############*/
  get getFormArray() {
    return this.testsForm.get('tests') as FormArray;
  }

  addTestItem() {
    let newFormControl = new FormControl(null, Validators.required);
    this.getFormArray.push(
      new FormGroup({
        test: newFormControl
      })
    );

    this.filteredOptions = newFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value)),
      map((name) =>
        name ? this._filter(name) : this.nonAddedTests.slice()
      )
    );
  }

  formChanged() {
    console.log(this.testsForm.value);
  }

  deleteLast() {
    this.getFormArray.removeAt(this.getFormArray.length - 1);
  }

  // Submit Form
  onSubmit() {
    console.log(
      'AddTestsComponent -> onSubmit -> this.testsForm.value.tests',
      this.testsForm.value.tests
    );
    const testIDs = this.testsForm.value.tests
      .filter((x) => x.test)
      .map((x) => ({ test: x.test.id }));
    this.notifyParent.emit(testIDs);
    this.activeModal.close('success');
  }
}
