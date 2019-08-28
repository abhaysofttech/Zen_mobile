import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallAssociatesMoreDetailsPage } from './overall-associates-more-details.page';

describe('OverallAssociatesMoreDetailsPage', () => {
  let component: OverallAssociatesMoreDetailsPage;
  let fixture: ComponentFixture<OverallAssociatesMoreDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallAssociatesMoreDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallAssociatesMoreDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
