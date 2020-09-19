import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTabsComponent } from './users-tabs.component';

describe('UsersTabsComponent', () => {
  let component: UsersTabsComponent;
  let fixture: ComponentFixture<UsersTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
