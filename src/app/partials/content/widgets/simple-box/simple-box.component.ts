import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kt-simple-box',
  templateUrl: './simple-box.component.html',
  styleUrls: ['./simple-box.component.scss']
})
export class SimpleBoxComponent implements OnInit {
  @Input() label;
  @Input() value;
  @Input() icon;
  constructor() { }

  ngOnInit() {
  }

}
