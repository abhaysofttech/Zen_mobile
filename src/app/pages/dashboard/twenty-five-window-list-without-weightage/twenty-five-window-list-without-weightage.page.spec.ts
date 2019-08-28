import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyFiveWindowListWithoutWeightagePage } from './twenty-five-window-list-without-weightage.page';

describe('TwentyFiveWindowListWithoutWeightagePage', () => {
  let component: TwentyFiveWindowListWithoutWeightagePage;
  let fixture: ComponentFixture<TwentyFiveWindowListWithoutWeightagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwentyFiveWindowListWithoutWeightagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwentyFiveWindowListWithoutWeightagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
