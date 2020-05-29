import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GardenCellComponent } from './garden-cell.component';
import * as enums from '../../../enums';

describe('GardenCellComponent', () => {
  let component: GardenCellComponent;
  let fixture: ComponentFixture<GardenCellComponent>;
  let div: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardenCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenCellComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('class should be empty and red on init', () => {
    fixture.detectChanges();
    div = fixture.nativeElement.querySelector('div');
    expect(div.classList).toContain('empty');
    expect(div.classList).toContain('red');
  })

  it('class should be currentSelection value', () => {
    component.currentSelection = {cellOption: enums.flowers.LILY , color: enums.colors.ORANGE};

    fixture.detectChanges();
    div = fixture.nativeElement.querySelector('div');

    div.click();
    fixture.detectChanges();

    expect(div.classList).toContain('lily');
    expect(div.classList).toContain('orange');
  })

  it('clicking cell twice should revert to empty', () => {
    component.currentSelection = {cellOption: enums.flowers.LILY , color: enums.colors.ORANGE};

    fixture.detectChanges();
    div = fixture.nativeElement.querySelector('div');

    div.click();
    fixture.detectChanges();

    div.click();
    fixture.detectChanges();
    
    expect(div.classList).toContain('empty');
    expect(div.classList).toContain('red');
  })
  
});
