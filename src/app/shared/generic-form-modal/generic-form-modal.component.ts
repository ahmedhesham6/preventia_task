import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kt-form-modal',
  templateUrl: './generic-form-modal.component.html',
  styleUrls: ['./generic-form-modal.component.scss']
})
export class GenericFormModalComponent implements OnInit {
  @Input() title: string;
  @Input() modelData: any;
  @Input() instanceData: any;
  @Input() gate: string;
  @Input() query: any;
  @Input() wizard = false;

  @Output() notifyParentSuccess = new EventEmitter<any>();

  public formData: any[];
  public formGroup: FormGroup;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    console.log(this.modelData);
  }

  _onSubmitSuccess(data) {
    console.log(data);
    this.activeModal.close(data);
    this.notifyParentSuccess.emit(data);
  }

  _onSubmitFail() {}

  _onCancel(emittedCancel) {
    this.activeModal.close('cancel');
  }
}
