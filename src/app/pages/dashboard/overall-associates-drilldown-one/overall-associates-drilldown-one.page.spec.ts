import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallAssociatesDrilldownOnePage } from './overall-associates-drilldown-one.page';

describe('OverallAssociatesDrilldownOnePage', () => {
  let component: OverallAssociatesDrilldownOnePage;
  let fixture: ComponentFixture<OverallAssociatesDrilldownOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallAssociatesDrilldownOnePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallAssociatesDrilldownOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
