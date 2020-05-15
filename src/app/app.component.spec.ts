import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { declarations, imports, providers } from '../imports'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, ...declarations],
      imports: imports,
      providers: providers
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'acnh-garden-planner'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('acnh-garden-planner');
  });
});
