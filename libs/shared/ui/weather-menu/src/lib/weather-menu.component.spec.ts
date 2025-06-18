import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherMenuComponent } from './weather-menu.component';

describe('WeatherMenuComponent', () => {
  let component: WeatherMenuComponent;
  let fixture: ComponentFixture<WeatherMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
