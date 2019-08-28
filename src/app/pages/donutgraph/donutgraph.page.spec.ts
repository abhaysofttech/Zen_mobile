import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutgraphPage } from './donutgraph.page';

describe('DonutgraphPage', () => {
  let component: DonutgraphPage;
  let fixture: ComponentFixture<DonutgraphPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutgraphPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutgraphPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
