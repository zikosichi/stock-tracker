import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Deserialize } from 'cerialize';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

// Models
import { Stock, StockQuotes } from '../models/stock';
import { environment } from '../../environments/environment';

@Injectable()
export class StockService {

  private get savedStocks(): Stock[] {
    const stocks = localStorage.getItem('tracker.stocks');
    return stocks ? JSON.parse(stocks) : [];
  }

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get stock companies from local json
   *
   * @returns {Observable<Stock[]>}
   * @memberof StockService
   */
  getCompanies(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`./assets/companylist.json`)
      .map(res => Deserialize(res || [], Stock));
  }

  /**
   * Save stock to local storage
   *
   * @param {Stock} c
   * @memberof StockService
   */
  saveStock(c: Stock) {
    const stocks = this.savedStocks;
    stocks.push(c);
    localStorage.setItem('tracker.stocks', JSON.stringify(stocks));
  }

  /**
   * Get locally saved stocks
   *
   * @returns {Stock[]}
   * @memberof StockService
   */
  getStocks(): Observable<Stock[]> {
    return Observable.of(this.savedStocks);
  }

  /**
   * Get stock batch details
   *
   * @param {string} symbols
   * @memberof StockService
   */
  getBatchStockQuotes(symbols: string): Observable<StockQuotes[]> {
    const params = new HttpParams()
      .set('function', 'BATCH_STOCK_QUOTES')
      .set('apikey', environment.apiKey)
      .set('symbols', symbols);

    return this.http.get<StockQuotes[]>(`${environment.apiUrl}/`, {
      params: params
    }).map(res => {
      return Deserialize(res['Stock Quotes'] || [], StockQuotes);
    });
  }



  /**
   * Get daily date of the stock
   *
   * @param {string} symbol
   * @returns {Observable<StockQuotes[]>}
   * @memberof StockService
   */
  getStockDailyData(symbol: string): Observable<StockQuotes[]> {
    const params = new HttpParams()
      .set('function', 'TIME_SERIES_DAILY')
      .set('apikey', environment.apiKey)
      .set('symbols', symbol);

    return this.http.get<StockQuotes[]>(`${environment.apiUrl}/`, {
      params: params
    }).map(res => {
      return Deserialize(res['Stock Quotes'] || [], StockQuotes);
    });
  }
}
