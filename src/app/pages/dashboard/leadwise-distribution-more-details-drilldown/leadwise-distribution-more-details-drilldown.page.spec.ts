import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadwiseDistributionMoreDetailsDrilldownPage } from './leadwise-distribution-more-details-drilldown.page';

describe('LeadwiseDistributionMoreDetailsDrilldownPage', () => {
  let component: LeadwiseDistributionMoreDetailsDrilldownPage;
  let fixture: ComponentFixture<LeadwiseDistributionMoreDetailsDrilldownPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadwiseDistributionMoreDetailsDrilldownPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadwiseDistributionMoreDetailsDrilldownPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
