import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillEmployeesComponent } from './skill-employees.component';

describe('SkillEmployeesComponent', () => {
  let component: SkillEmployeesComponent;
  let fixture: ComponentFixture<SkillEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
