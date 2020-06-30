import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleScreenEditComponent } from './role-screen-edit.component';

describe('RoleScreenEditComponent', () => {
  let component: RoleScreenEditComponent;
  let fixture: ComponentFixture<RoleScreenEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleScreenEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleScreenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
