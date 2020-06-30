import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmantComponent } from './add-departmant.component';

describe('AddDepartmantComponent', () => {
  let component: AddDepartmantComponent;
  let fixture: ComponentFixture<AddDepartmantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDepartmantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartmantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
