import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { imports, newEvent } from '../../imports';

import { SidenavComponent } from './sidenav.component';
import { DisableColorPipe } from '../pipes/disable-color.pipe';
import { By } from '@angular/platform-browser';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavComponent, DisableColorPipe ],
      imports: imports
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('clicking on change grid option opens dialog', () => {
    component.isSidebarOpen = true;

    fixture.detectChanges();
    const changeGridDiv = fixture.nativeElement.querySelector('div#change-grid');

    changeGridDiv.click();

    fixture.detectChanges();
    const changeGridDialog = fixture.debugElement.query(By.css('#change-grid-dialog'));

    expect(component.showChangeGridConfirmation).toBeTrue; 
    expect(changeGridDialog.nativeElement.getAttribute('ng-reflect-visible')).toBe('true'); 
  });

  it('grid will change to size specified in input', () => {
    component.isSidebarOpen = true;
  
    fixture.detectChanges();
    const changeGridDiv = fixture.nativeElement.querySelector('div#change-grid');

    changeGridDiv.click();

    fixture.detectChanges();
    const dialogInput = fixture.nativeElement.querySelector('.dialog-input');

    dialogInput.value = 12;
    dialogInput.dispatchEvent(newEvent('input'))

    fixture.detectChanges();

    expect(component.newGridSize).toBeCloseTo(12);
  })
});
