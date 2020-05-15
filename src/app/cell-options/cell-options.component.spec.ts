import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DisableColorPipe } from '../pipes/disable-color.pipe';
import { imports } from '../../imports';

import { CellOptionsComponent } from './cell-options.component';
import { CustomDropdownComponent } from '../custom-dropdown/custom-dropdown.component';

describe('CellOptionsComponent', () => {
  let component: CellOptionsComponent;
  let fixture: ComponentFixture<CellOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellOptionsComponent, CustomDropdownComponent, DisableColorPipe ],
      imports: imports
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
