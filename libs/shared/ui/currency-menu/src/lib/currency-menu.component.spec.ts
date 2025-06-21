import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CurrencyMenuComponent } from './currency-menu.component';
import { CurrencyExchangeRate } from '@chill-desktop/shared/models';
import { DatePipe } from '@angular/common';
import { Component, LOCALE_ID, ViewChild } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { changeCurrencyAction, loadCurrencyAction } from '@chill-desktop/data-acess';

const mockCurrency: CurrencyExchangeRate = {
  fromCurrency: 'USD',
  toCurrency: 'BRL',
  rates: {
    BRL: 5.25,
  },
  targetRate: 5.25,
  lastUpdated: new Date('2024-01-15T10:30:00Z'),
};

@Component({
  template: `
    <button [matMenuTriggerFor]="currencyMenu.matMenu">Open Menu</button>
    <chill-currency-menu #currencyMenu [currency]="currency"></chill-currency-menu>
  `,
  standalone: true,
  imports: [MatMenuModule, CurrencyMenuComponent],
})
class TestHostComponent {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @ViewChild(CurrencyMenuComponent) currencyMenu!: CurrencyMenuComponent;
  currency?: CurrencyExchangeRate;
}

describe('CurrencyMenuComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let component: CurrencyMenuComponent;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyMenuComponent, NoopAnimationsModule, TestHostComponent],
      providers: [provideMockStore({}), DatePipe, { provide: LOCALE_ID, useValue: 'pt-BR' }],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    store = TestBed.inject(MockStore);
    hostFixture.detectChanges();
    component = hostComponent.currencyMenu;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have matMenu defined', () => {
    expect(component.matMenu).toBeDefined();
  });

  it('should display currency information when currency data is provided', () => {
    hostComponent.currency = mockCurrency;
    hostFixture.detectChanges();
    hostComponent.menuTrigger.openMenu();
    hostFixture.detectChanges();

    const compiled = hostFixture.debugElement;
    const rateValue = compiled.query(By.css('[data-testid="rate-value"]'));
    const lastUpdatedDate = compiled.query(By.css('[data-testid="last-updated-date"]'));
    const currencyName = compiled.query(By.css('[data-testid="currency-name"]'));

    expect(rateValue).toBeTruthy();
    expect(lastUpdatedDate).toBeTruthy();
    expect(currencyName).toBeTruthy();
  });

  it('should display no data message when currency is undefined', () => {
    hostComponent.currency = undefined;
    hostFixture.detectChanges();
    hostComponent.menuTrigger.openMenu();
    hostFixture.detectChanges();

    const compiled = hostFixture.debugElement;
    const noDataElement = compiled.query(By.css('[data-testid="no-currency-data"]'));

    expect(noDataElement).toBeTruthy();
    expect(noDataElement.nativeElement.getAttribute('role')).toBe('alert');
    expect(noDataElement.nativeElement.textContent.trim()).toContain('Dados de câmbio não disponíveis');
  });

  it('should format rate correctly', () => {
    expect(component.formatRate(5.25)).toBe('5.2500');
    expect(component.formatRate(1.0)).toBe('1.0000');
  });

  it('should get currency name correctly', () => {
    expect(component.getCurrencyName('BRL')).toBe('Real Brasileiro');
    expect(component.getCurrencyName('EUR')).toBe('Euro');
    expect(component.getCurrencyName('UNKNOWN')).toBe('UNKNOWN'); // Não encontrado
  });

  it('should display date time with Brazilian Portuguese locale format with datepipe', () => {
    hostComponent.currency = mockCurrency;
    hostFixture.detectChanges();
    hostComponent.menuTrigger.openMenu();
    hostFixture.detectChanges();
    const datePipe = new DatePipe('pt-BR');
    const expectedDate = datePipe.transform(mockCurrency.lastUpdated, 'd MMM y');
    const dateTime = hostFixture.debugElement.query(By.css('[data-testid="last-updated-date"] > span'));

    expect(dateTime).toBeTruthy();
    expect(dateTime.nativeElement.textContent.trim()).toContain(expectedDate);
  });

  it('should dispatch loadCurrencyAction when refresh button is clicked', () => {
    hostComponent.currency = mockCurrency;
    hostFixture.detectChanges();
    hostComponent.menuTrigger.openMenu();
    hostFixture.detectChanges();

    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const refreshButton = hostFixture.debugElement.query(By.css('[data-testid="refresh-button"]'));

    expect(refreshButton).toBeTruthy();
    refreshButton.nativeElement.click();

    expect(dispatchSpy).toHaveBeenCalledWith(
      loadCurrencyAction({
        fromCurrency: mockCurrency.fromCurrency,
        toCurrency: mockCurrency.toCurrency,
      })
    );
  });

  it('should dispatch changeCurrencyAction when form values change with valid currencies', () => {
    hostComponent.currency = mockCurrency;
    hostFixture.detectChanges();
    hostComponent.menuTrigger.openMenu();
    hostFixture.detectChanges();

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    // Simula mudança no formulário
    component.form.patchValue({
      fromCurrency: 'EUR',
      toCurrency: 'USD',
    });

    expect(dispatchSpy).toHaveBeenCalledWith(
      changeCurrencyAction({
        fromCurrency: 'EUR',
        toCurrency: 'USD',
      })
    );
  });

  it('should not dispatch changeCurrencyAction when form values are null', () => {
    hostComponent.currency = mockCurrency;
    hostFixture.detectChanges();
    hostComponent.menuTrigger.openMenu();
    hostFixture.detectChanges();

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.form.get('fromCurrency')?.setValue(null);
    component.form.get('toCurrency')?.setValue('USD');

    expect(dispatchSpy).not.toHaveBeenCalledWith(
      changeCurrencyAction(
        expect.objectContaining({
          fromCurrency: null,
        })
      )
    );
  });

  it('should not dispatch changeCurrencyAction when form values are equal to the store values', () => {
    hostComponent.currency = mockCurrency;
    hostFixture.detectChanges();
    hostComponent.menuTrigger.openMenu();
    hostFixture.detectChanges();

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.form.patchValue({
      fromCurrency: mockCurrency.fromCurrency,
      toCurrency: mockCurrency.toCurrency,
    });

    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
