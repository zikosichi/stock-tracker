import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Deserialize } from 'cerialize';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

// Models
import { Stock, StockQuotes, StockDetails } from '../models/stock';
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

    return this.http.get<StockQuotes[]>(`${environment.apiUrl}/query?`, {
      params: params
    }).map(res => {
      return Deserialize(res['Stock Quotes'] || [], StockQuotes);
    });
  }



  /**
   * Get daily date of the stock
   *
   * @param {string} symbol
   * @returns {Observable<StockDetails[]>}
   * @memberof StockService
   */
  getStockDailyData(symbol: string): Observable<StockDetails[]> {
    const params = new HttpParams()
      .set('function', 'TIME_SERIES_DAILY')
      .set('apikey', environment.apiKey)
      .set('symbol', symbol);

    return this.http.get<StockDetails[]>(`${environment.apiUrl}/query?`, {
      params: params
    })
      .map(res => {
        return Object.entries(res['Time Series (Daily)']).map(key => {
          return {
            name: key[0],
            ...key[1]
          };
        });
      })
      .map(res => {
        return Deserialize(res || [], StockDetails);
      });
  }

  private parseStockDetails(obj: any) {
    const key = Object.keys(obj)[0];
    console.log(key);
  }
}
