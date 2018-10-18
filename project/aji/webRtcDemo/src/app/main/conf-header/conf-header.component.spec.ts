import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfHeaderComponent } from './conf-header.component';

describe('ConfHeaderComponent', () => {
  let component: ConfHeaderComponent;
  let fixture: ComponentFixture<ConfHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
