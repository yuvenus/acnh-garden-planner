import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GardenComponent } from './garden.component';
import { GardenCellComponent } from './garden-cell/garden-cell.component';

describe('GardenComponent', () => {
  let component: GardenComponent;
  let fixture: ComponentFixture<GardenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardenComponent, GardenCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
