import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadwiseDistributionMoreDetailsPage } from './leadwise-distribution-more-details.page';

describe('LeadwiseDistributionMoreDetailsPage', () => {
  let component: LeadwiseDistributionMoreDetailsPage;
  let fixture: ComponentFixture<LeadwiseDistributionMoreDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadwiseDistributionMoreDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadwiseDistributionMoreDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
