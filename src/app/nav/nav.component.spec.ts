import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DisableColorPipe } from '../pipes/disable-color.pipe';
import { imports } from '../../imports';

import { NavComponent } from './nav.component';
import { CustomDropdownComponent } from '../custom-dropdown/custom-dropdown.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent, CustomDropdownComponent, DisableColorPipe ],
      imports: imports
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
