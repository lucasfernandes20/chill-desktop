import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChillDesktopDataAcessComponent } from './chill-desktop-data-acess.component';

describe('ChillDesktopDataAcessComponent', () => {
  let component: ChillDesktopDataAcessComponent;
  let fixture: ComponentFixture<ChillDesktopDataAcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChillDesktopDataAcessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChillDesktopDataAcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
