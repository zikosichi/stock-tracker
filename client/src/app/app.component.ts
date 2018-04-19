import { Component, OnInit } from '@angular/core';

// Services
import { StockService } from './services/stock.service';

// Models
import { Stock } from './models/stock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  stocks: Stock[] = [];
  selectedStock: Stock;

  constructor(
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.getStocks();
  }

  /**
   * Save new stock on stock select
   *
   * @param {Stock} c
   * @memberof AppComponent
   */
  onStockSelect(c: Stock) {
    this.stockService.saveStock(c);
    this.getStocks();
  }

  /**
   * Get saved stocks from local storage
   * and populate each item with quotes
   *
   * @memberof AppComponent
   */
  getStocks() {
    this.stockService.getStocks().subscribe(res => {
      this.stocks = res;
      const stockSymbols = res.map(c => c.symbol).join(',');
      this.stockService.getBatchStockQuotes(stockSymbols).subscribe(quotes => {
        this.stocks.forEach(stock => {
          stock.stockQuotes = quotes.find(q => q.symbol === stock.symbol);
        });
      });
    });
  }

  /**
   * Toggle stock details
   *
   * @param {Stock} stock
   * @memberof AppComponent
   */
  toggleStock(stock: Stock) {
    this.selectedStock = this.selectedStock === stock ? null : stock;
  }
}
