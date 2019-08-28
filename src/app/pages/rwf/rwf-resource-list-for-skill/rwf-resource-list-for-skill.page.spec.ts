import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RwfResourceListForSkillPage } from './rwf-resource-list-for-skill.page';

describe('RwfResourceListForSkillPage', () => {
  let component: RwfResourceListForSkillPage;
  let fixture: ComponentFixture<RwfResourceListForSkillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RwfResourceListForSkillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RwfResourceListForSkillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
