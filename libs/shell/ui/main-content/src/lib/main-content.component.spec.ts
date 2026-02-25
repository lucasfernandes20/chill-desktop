import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainContentComponent } from './main-content.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContentComponent],
      providers: [
        provideMockStore({
          initialState: {
            apps: {
              ids: [],
              entities: {},
              status: 'initial',
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
