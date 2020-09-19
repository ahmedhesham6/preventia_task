import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CRUDService } from '../_services/crud.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'kt-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  @Input() label: string;
  @Output() notifyParent = new EventEmitter<any>();
  @Input() orderID: number;
  @Input() wallet;
  @Input() type;
  @Input() subject;
  @Input() amount;
  public loading = 0;
  public formGroup: FormGroup;
  public transTypes = [
    'chemist-cash-collected', // chemist collecting cash from cutomer
    'order-payment', // generic order payment
    'lab-cut', // Lab reserved cut
    'lab-cut-delivered', // Lab receiving their cut
    'new-cash-order', // customer paying cash for order
    'new-cowpay-order', // customer paying cash for order
    'chemist-visit-profit', // Chemist getting their profit for visi
    'cash-paid', // customer paying cash amount
    'credit-card-paid', // customer paying online
    'pay-back', // checkme paying lab/chemist back
    'receive-cash', // check me receiving cash from chemist/lab
    'other'
  ];
  constructor(
    private _crudService: CRUDService,
    public activeModal: NgbActiveModal
  ) {
    this.formGroup = new FormGroup({
      amount: new FormControl(
        this.amount || null,
        Validators.required
      ),
      type: new FormControl(null, Validators.required),
      wallet: new FormControl(null, Validators.required),
      verified: new FormControl(true, Validators.required),
      subject: new FormControl()
    });
  }

  ngOnInit() {
    this.formGroup.patchValue({
      wallet: this.wallet ? this.wallet.id : null,
      type: this.type ? this.type : null,
      amount: this.amount,
      subject: this.subject
    });
  }

  onSubmit() {
    console.log(
      'AddTransactionComponent -> onSubmit -> this.formGroup',
      this.formGroup
    );
    let formValue = this.formGroup.value;
    console.log(
      'AddTransactionComponent -> onSubmit -> formValue',
      formValue
    );
    if (this.orderID) {
      formValue.order = this.orderID;
    }
    if (this.type === 'receive-cash') {
      formValue.amount = Math.abs(formValue.amount);
    }
    if (this.type === 'pay-back') {
      formValue.amount = -Math.abs(formValue.amount);
    }
    this.loading++;
    this._crudService
      .addData('wallettransactions', formValue)
      .then((response) => {
        this.loading--;
        if (this.notifyParent) {
          this.activeModal.close('success');
        }
      })
      .catch((e) => {
        this.loading--;
        console.error('Failed to proceed transaction');
        console.error(e);
      });
  }
}
