import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'kt-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  FAQs: FAQ[] = [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  //Add FAQ
  addFAQ() {
    let id: number = this.FAQs.length + Math.floor(Math.random() * 100) + 1;
    this.FAQs.push({
      id,
      question: "",
      answer: ""
    })
  }

  //Delete FAQ
  deleteFAQ(faq: FAQ) {
    this.FAQs = this.FAQs.filter(f => {
      return f.id !== faq.id;
    })
  }
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}
