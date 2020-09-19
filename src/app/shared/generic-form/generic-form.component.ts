import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { CRUDService } from '../_services/crud.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  LayoutUtilsService,
  MessageType
} from '../../core/_base/crud';

@Component({
  selector: 'kt-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent implements OnInit {
  @Input() title: string;
  @Input() modelData: any;
  @Input() instanceData: any;
  @Input() gate: string;
  @Input() query: any;
  @Input() cancelBtnText: string;
  @Input() submitBtnText: string;
  @Input() modalFlag = false;

  @Output()
  notifyParentCancel: EventEmitter<any> = new EventEmitter();
  @Output()
  notifyParentSuccess: EventEmitter<any> = new EventEmitter();
  @Output()
  notifyParentFailure: EventEmitter<any> = new EventEmitter();
  @Output()
  emitFormValue: EventEmitter<any> = new EventEmitter();
  public formData;
  public formGroups: any[];
  public formGroup: FormGroup;
  public wizardFlag: boolean;
  public activeStep: number;
  public totalSteps: number;
  public loading = 0;
  public uploading = 0;
  public selectedFile;
  // for image upload, if exists
  public imgURL;
  constructor(
    private _crudService: CRUDService,
    private changeDetectorRefs: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService
  ) {
    this.formGroup = new FormGroup({});
  }

  ngOnInit() {
    this.formData = this.modelData.form;
    this.formGroups = this.modelData.form['groups'];
    this.wizardFlag = this.formData.wizardFlag;

    this.activeStep = 1;
    this.totalSteps = this.formGroups.length;
    // making sure form data is an array for consistency
    if (!Array.isArray(this.formGroups)) {
      this.formGroups = [this.formGroups];
    }

    let group: any = {};
    const formInputs = this.formGroups.reduce((acc, singleForm) => {
      return acc.concat(singleForm['inputs']);
    }, []);

    formInputs.forEach((element, j) => {
      if (!element.gate) {
        element.gate = element.name;
      }
      let inputValidators = [];
      if (element.email) {
        inputValidators.push(Validators.email);
      }
      if (element.required) {
        inputValidators.push(Validators.required);
      }
      group[element.gate] = new FormControl(
        element.value || element.defaultValue || null,
        inputValidators
      );

      if (element.type === 'select' && !element.simpleOpts) {
        this._crudService
          .getData(element.apiend, { limit: 70 })
          .then((res) => {
            element.options = (res.data ? res.data : res) || [];
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });

    this.formGroup = new FormGroup(group);

    const editData = { ...this.instanceData };
    for (const key in editData) {
      if (
        editData[key] != null &&
        typeof editData[key] === 'object'
      ) {
        editData[key] = editData[key].id;
      }
    }
    this.formGroup.patchValue(editData);
  }

  handleDateChange(formControlName, event) {
    // formatting date
    const d = new Date(event.target.value);
    const ye = new Intl.DateTimeFormat('en', {
      year: 'numeric'
    }).format(d);
    const mo = new Intl.DateTimeFormat('en', {
      month: '2-digit'
    }).format(d);
    const da = new Intl.DateTimeFormat('en', {
      day: '2-digit'
    }).format(d);
    this.formGroup.patchValue({
      [formControlName]: `${ye}-${mo}-${da}`
    });
  }

  submit() {
    let sentData = {};
    const formValue = this.formGroup.value;
    for (let index in formValue) {
      if (formValue[index]) {
        sentData[index] = formValue[index];
      }
    }
    if (this.formData['type'] === 'notifyParent') {
      return this.emitFormValue.emit(formValue);
    }

    let modifyPromise;

    if (this.formData['type'] === 'special') {
      console.log('Sepcial form');
      let formBody = { ...sentData };
      if (this.formData['wrapperKey']) {
        formBody = {
          [this.formData['wrapperKey']]: { ...sentData }
        };
      }
      modifyPromise = this._crudService.api(
        this.formData['endPoint'],
        formBody,
        this.formData['httpMethod']
      );
    } else {
      if (this.query.id) {
        console.log('Edit mode');
        modifyPromise = this._crudService.editData(
          this.gate,
          sentData,
          this.query.id
        );
      } else {
        console.log('Create mode');
        modifyPromise = this._crudService.addData(
          this.gate,
          sentData,
          this.query
        );
      }
    }

    this.loading++;
    return modifyPromise
      .then((res) => {
        this.loading--;

        this._crudService.forwardForceRefresh(true);
        this.layoutUtilsService.showActionNotification(
          res.message || 'Successfully sent',
          MessageType.Create
        );
        if (this.notifyParentSuccess) {
          this.notifyParentSuccess.emit({
            id: this.query.id,
            ...sentData
          });
        }
      })
      .catch((err) => {
        this.loading--;

        this.layoutUtilsService.showActionNotification(
          'Failed: ' + err.error.message ||
            'Sorry, something went worng.',
          MessageType.Delete
        );
        if (this.notifyParentFailure) {
          this.notifyParentFailure.emit(err);
        }
      });
  }

  cancelChanges() {
    // FIXME: edit case
    this.formGroup.reset();
    if (this.notifyParentCancel) {
      this.notifyParentCancel.emit(true);
    }
  }

  backChanges() {
    this.activeStep -= 1;
  }

  next() {
    this.activeStep += 1;
  }

  isControlHasError(
    controlName: string,
    validationType: string
  ): boolean {
    const control = this.formGroup.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) &&
      (control.dirty || control.touched);
    return result;
  }

  onFileChange(event, controlName) {
    console.log(
      'GenericFormComponent -> onFileChange -> controlName',
      controlName
    );
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.selectedFile = file;
      event.target.value = '';

      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.layoutUtilsService.showActionNotification(
          'Not Allowed\n' + 'Only image files are allowed.',
          MessageType.Delete
        );
        return;
      }

      this.imgURL = null;
      if (this.instanceData) {
        this.instanceData[controlName] = null;
      }

      this.uploadFile()
        .then((fileUri) => {
          console.log(
            'GenericFormComponent -> onFileChange -> fileUri',
            fileUri
          );
          this.uploading--;

          this.formGroup.patchValue({
            [controlName]: fileUri
          });
          if (this.instanceData) {
            this.instanceData[controlName] = fileUri;
          }
          this.imgURL = fileUri;
          console.log('Detetcing changesf');
          // this.changeDetectorRefs.detectChanges();
        })

        .catch((err) => {
          console.log(
            'GenericFormComponent -> onFileChange -> err',
            err
          );
          this.uploading--;
          this.layoutUtilsService.showActionNotification(
            'Sorry, failed to upload image',
            MessageType.Delete
          );
        });

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }

  uploadFile() {
    this.uploading++;
    return this._crudService
      .uploadAttachment(this.selectedFile)
      .then((response) => {
        return response['uploadedFile'].link;
      });
  }
}
