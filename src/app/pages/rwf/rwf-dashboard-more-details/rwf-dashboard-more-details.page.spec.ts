import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RwfDashboardMoreDetailsPage } from './rwf-dashboard-more-details.page';

describe('RwfDashboardMoreDetailsPage', () => {
  let component: RwfDashboardMoreDetailsPage;
  let fixture: ComponentFixture<RwfDashboardMoreDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RwfDashboardMoreDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RwfDashboardMoreDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
