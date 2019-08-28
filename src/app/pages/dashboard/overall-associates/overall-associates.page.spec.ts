import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallAssociatesPage } from './overall-associates.page';

describe('OverallAssociatesPage', () => {
  let component: OverallAssociatesPage;
  let fixture: ComponentFixture<OverallAssociatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallAssociatesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallAssociatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
