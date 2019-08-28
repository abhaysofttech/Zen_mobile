import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyFiveWindowWithoutWeightageMoreDetailsPage } from './twenty-five-window-without-weightage-more-details.page';

describe('TwentyFiveWindowWithoutWeightageMoreDetailsPage', () => {
  let component: TwentyFiveWindowWithoutWeightageMoreDetailsPage;
  let fixture: ComponentFixture<TwentyFiveWindowWithoutWeightageMoreDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwentyFiveWindowWithoutWeightageMoreDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwentyFiveWindowWithoutWeightageMoreDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
