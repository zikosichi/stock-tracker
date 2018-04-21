import { Component, OnInit } from '@angular/core';

// Services
import { StockService } from './services/stock.service';
import { SharedService } from './services/shared.service';

// Models
import { Stock } from './models/stock';
import { Segment } from './models/segment';

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
  refreshSegments: Segment[] = [
    { name: '1 min', value: 1 },
    { name: '5 min', value: 5 },
    { name: '15 min', value: 15 },
    { name: '30 min', value: 30 }
  ];

  constructor(
    private stockService: StockService,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.getStocks();

    this.sharedService.onRefreshIntervalChange.subscribe(res => {
      console.log(res);
    });
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


  /**
   * On interval segment change
   *
   * @param {Segment} segment
   * @memberof AppComponent
   */
  onIntervalChange(segment: Segment) {
    this.sharedService.onRefreshIntervalChange.next(segment);
  }
}
