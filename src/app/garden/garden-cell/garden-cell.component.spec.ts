import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenCellComponent } from './garden-cell.component';

describe('GardenCellComponent', () => {
  let component: GardenCellComponent;
  let fixture: ComponentFixture<GardenCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardenCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
