import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyFiveWindowWithWeightageMoreDetailsDrilldownPage } from './twenty-five-window-with-weightage-more-details-drilldown.page';

describe('TwentyFiveWindowWithWeightageMoreDetailsDrilldownPage', () => {
  let component: TwentyFiveWindowWithWeightageMoreDetailsDrilldownPage;
  let fixture: ComponentFixture<TwentyFiveWindowWithWeightageMoreDetailsDrilldownPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwentyFiveWindowWithWeightageMoreDetailsDrilldownPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwentyFiveWindowWithWeightageMoreDetailsDrilldownPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
