import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSearchPage } from './generic-search.page';

describe('GenericSearchPage', () => {
  let component: GenericSearchPage;
  let fixture: ComponentFixture<GenericSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
