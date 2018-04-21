import { Component, OnInit } from '@angular/core';

// Services
import { StockService } from './services/stock.service';

// Models
import { Stock } from './models/stock';

// Animations
import { slide } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slide]
})
export class AppComponent implements OnInit {

  stocks: Stock[] = [];
  selectedStock: Stock;
  isLoadingStocksPrices = false;

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
      this.updateStockPrices(this.stocks);
    });
  }

  updateStockPrices(stocks: Stock[]) {
    this.isLoadingStocksPrices = true;
    const stockSymbols = stocks.map(c => c.symbol).join(',');
    this.stockService.getBatchStockQuotes(stockSymbols).subscribe(quotes => {
      this.stocks.forEach(stock => {
        stock.stockQuotes = quotes.find(q => q.symbol === stock.symbol);
      });
      this.isLoadingStocksPrices = false;
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

  /**
   * Remove stock from the list
   *
   * @param {Stock} stock
   * @memberof AppComponent
   */
  deleteStock(stock: Stock) {
    this.stockService.deleteStockById(stock.id);
    this.getStocks();
  }

  /**
   * Track by function for stocks list
   *
   * @param {number} index
   * @param {Stock} item
   * @returns
   * @memberof AppComponent
   */
  trackByFn(index: number, item: Stock) {
    return item.id;
  }
}
