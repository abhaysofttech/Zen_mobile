import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSearchResultsPage } from './generic-search-results.page';

describe('GenericSearchResultsPage', () => {
  let component: GenericSearchResultsPage;
  let fixture: ComponentFixture<GenericSearchResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericSearchResultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericSearchResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
