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
    c.id = this.uniqueId();
    stocks.push(c);
    localStorage.setItem('tracker.stocks', JSON.stringify(stocks));
  }

  /**
   * Delete stock by id
   *
   * @param {string} id
   * @memberof StockService
   */
  deleteStockById(id: string) {
    const stocks = this.savedStocks;
    const index = stocks.findIndex(s => s.id === id);
    if (index !== -1) {
      stocks.splice(index, 1);
    }
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
  getStockDailyData(symbol: string, type = 'TIME_SERIES_DAILY', interval = 'Daily'): Observable<StockDetails[]> {
    let params = new HttpParams()
      .set('function', type)
      .set('apikey', environment.apiKey)
      .set('symbol', symbol);

    if (interval !== 'Daily') {
      params = params.set('interval', interval);
    }

    return this.http.get<StockDetails[]>(`${environment.apiUrl}/query?`, {
      params: params
    })
      .map(res => {
        return Object.entries(res[`Time Series (${interval})`]).map(key => {
          return {
            date: key[0],
            ...key[1]
          };
        });
      })
      .map(res => {
        return res.sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1).splice(0, 30);
      })
      .map(res => {
        return Deserialize(res || [], StockDetails);
      });
  }

  /**
   * Moves object key inside the object
   *
   * @private
   * @param {*} obj
   * @memberof StockService
   */
  private parseStockDetails(obj: any) {
    const key = Object.keys(obj)[0];
    console.log(key);
  }

  /**
   * Generates random ID
   *
   * @private
   * @returns
   * @memberof StockService
   */
  private uniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
  }
}
