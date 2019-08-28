import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRwfTransactionPage } from './my-rwf-transaction.page';

describe('MyRwfTransactionPage', () => {
  let component: MyRwfTransactionPage;
  let fixture: ComponentFixture<MyRwfTransactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRwfTransactionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRwfTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
