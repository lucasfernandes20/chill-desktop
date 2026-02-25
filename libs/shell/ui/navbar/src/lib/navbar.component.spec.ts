import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectApps } from '@chill-desktop/data-acess';
import { By } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppItem } from '@chill-desktop/shared/models';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let store: MockStore;

  const mockApps: AppItem[] = [
    { id: 1, name: 'App 1', icon: 'home', isVisible: true },
    { id: 2, name: 'App 2', icon: 'settings', isVisible: true },
    { id: 3, name: 'App 3', icon: 'person', isVisible: false },
    { id: 4, name: 'App 4', icon: 'mail', isVisible: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, MatTooltipModule, MatIconModule, NoopAnimationsModule],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectApps, value: mockApps }],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render only visible apps', () => {
    const appElements = fixture.debugElement.queryAll(By.css('[data-testid="app-item"]'));
    expect(appElements.length).toBe(3);
  });

  it('should display correct app names in tooltips', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button[mat-mini-fab]'));
    expect(buttons[0].attributes['ng-reflect-message']).toBe('App 1');

    expect(buttons[1].attributes['ng-reflect-message']).toBe('App 2');

    expect(buttons[2].attributes['ng-reflect-message']).toBe('App 4');
  });

  it('should display correct icons for each app', () => {
    const iconElements = fixture.debugElement.queryAll(By.css('mat-icon'));

    expect(iconElements[0].nativeElement.textContent.trim()).toBe('home');
    expect(iconElements[1].nativeElement.textContent.trim()).toBe('settings');
    expect(iconElements[2].nativeElement.textContent.trim()).toBe('mail');
  });

  it('should update when apps state changes', () => {
    const updatedApps: AppItem[] = [
      { id: 1, name: 'App 1', icon: 'home', isVisible: true },
      { id: 2, name: 'App 2', icon: 'settings', isVisible: false },
      { id: 5, name: 'App 5', icon: 'star', isVisible: true },
    ];

    store.overrideSelector(selectApps, updatedApps);
    store.refreshState();
    fixture.detectChanges();

    const appElements = fixture.debugElement.queryAll(By.css('[data-testid="app-item"]'));
    expect(appElements.length).toBe(2);

    const iconElements = fixture.debugElement.queryAll(By.css('mat-icon'));
    expect(iconElements[0].nativeElement.textContent.trim()).toBe('home');
    expect(iconElements[1].nativeElement.textContent.trim()).toBe('star');
  });

  it('should render an add app button when the navbar has no apps', () => {
    store.overrideSelector(selectApps, []);
    store.refreshState();
    fixture.detectChanges();

    const appElements = fixture.debugElement.queryAll(By.css('[data-testid="app-item"]'));
    expect(appElements.length).toBe(0);

    const addAppButton = fixture.debugElement.query(By.css('[data-testid="add-app-button"]'));
    expect(addAppButton).toBeTruthy();
  });

  // Testes de acessibilidade
  it('should have navigation role and aria-label', () => {
    const navElement = fixture.debugElement.query(By.css('div[role="navigation"]'));
    expect(navElement).toBeTruthy();
    expect(navElement.attributes['aria-label']).toBe('Barra de navegação de aplicativos');
  });

  it('should have aria-label attributes on app buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button[mat-mini-fab]'));

    expect(buttons[0].attributes['aria-label']).toBe('App 1');
    expect(buttons[1].attributes['aria-label']).toBe('App 2');
    expect(buttons[2].attributes['aria-label']).toBe('App 4');
  });

  it('should have visually hidden text for screen readers', () => {
    const hiddenTexts = fixture.debugElement.queryAll(By.css('.cdk-visually-hidden'));
    expect(hiddenTexts.length).toBe(3);
    expect(hiddenTexts[0].nativeElement.textContent).toBe('App 1');
    expect(hiddenTexts[1].nativeElement.textContent).toBe('App 2');
    expect(hiddenTexts[2].nativeElement.textContent).toBe('App 4');
  });

  it('should mark decorative elements as aria-hidden', () => {
    const decorativeElements = fixture.debugElement.queryAll(By.css('[aria-hidden="true"]'));
    expect(decorativeElements.length).toBeGreaterThan(0);
  });

  it('should have aria-label on add app button when no apps are present', () => {
    store.overrideSelector(selectApps, []);
    store.refreshState();
    fixture.detectChanges();

    const addButton = fixture.debugElement.query(By.css('button[mat-mini-fab]'));
    expect(addButton.attributes['aria-label']).toBe('Adicionar aplicativo');
  });
});
