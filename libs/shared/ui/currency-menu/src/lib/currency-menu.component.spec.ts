import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CurrencyMenuComponent } from './currency-menu.component';
import { CurrencyExchangeRate } from '@chill-desktop/shared/models';

describe('CurrencyMenuComponent', () => {
  let component: CurrencyMenuComponent;
  let fixture: ComponentFixture<CurrencyMenuComponent>;
  let store: MockStore;

  const mockCurrency: CurrencyExchangeRate = {
    fromCurrency: 'USD',
    toCurrency: 'BRL',
    rate: 5.25,
    lastUpdated: new Date('2024-01-15T10:30:00Z'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyMenuComponent, NoopAnimationsModule],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyMenuComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display currency information when currency data is provided', () => {
    component.currency = mockCurrency;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-testid="from-currency-value"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="to-currency-value"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="last-updated-date"]')).toBeTruthy();
  });

  it('should display no data message when currency is undefined', () => {
    component.currency = undefined;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[data-testid="no-currency-data"]')).toBeTruthy();
  });

  it('should format rate correctly', () => {
    expect(component.formatRate(5.25)).toBe('5.2500');
    expect(component.formatRate(1.0)).toBe('1.0000');
  });

  it('should get currency symbol correctly', () => {
    expect(component.getCurrencySymbol('BRL')).toBe('R$');
    expect(component.getCurrencySymbol('USD')).toBe('USD'); // Não está na lista, retorna o código
    expect(component.getCurrencySymbol('EUR')).toBe('€');
  });

  it('should get currency name correctly', () => {
    expect(component.getCurrencyName('BRL')).toBe('Real Brasileiro');
    expect(component.getCurrencyName('EUR')).toBe('Euro');
    expect(component.getCurrencyName('UNKNOWN')).toBe('UNKNOWN'); // Não encontrado
  });

  it('should get last updated text correctly', () => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    expect(component.getLastUpdatedText(now)).toBe('Agora mesmo');
    expect(component.getLastUpdatedText(oneMinuteAgo)).toBe('1 min atrás');
    expect(component.getLastUpdatedText(oneHourAgo)).toBe('1h atrás');
    expect(component.getLastUpdatedText(oneDayAgo)).toBe('Ontem');
  });

  it('should dispatch action on refresh', () => {
    spyOn(store, 'dispatch');
    component.onRefresh();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should dispatch action on currency change', () => {
    spyOn(store, 'dispatch');
    component.onCurrencyChange('EUR');
    expect(store.dispatch).toHaveBeenCalled();
  });
});
