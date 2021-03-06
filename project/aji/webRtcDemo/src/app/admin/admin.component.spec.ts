
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [AdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
