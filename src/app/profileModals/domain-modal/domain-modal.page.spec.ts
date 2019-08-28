import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainModalPage } from './domain-modal.page';

describe('DomainModalPage', () => {
  let component: DomainModalPage;
  let fixture: ComponentFixture<DomainModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
