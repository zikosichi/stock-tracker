import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Deserialize } from 'cerialize';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

// Models
import { Stock } from '../models/company';

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
}
