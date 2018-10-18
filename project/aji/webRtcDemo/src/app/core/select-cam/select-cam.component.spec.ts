import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCamComponent } from './select-cam.component';

describe('SelectCamComponent', () => {
  let component: SelectCamComponent;
  let fixture: ComponentFixture<SelectCamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
