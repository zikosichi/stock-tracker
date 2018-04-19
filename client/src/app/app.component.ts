import { Component, OnInit } from '@angular/core';

// Services
import { StockService } from './services/stock.service';

// Models
import { Stock } from './models/company';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  stocks: Stock[] = [];

  constructor(
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.getStocks();
  }

  onStockSelect(c: Stock) {
    this.stockService.saveStock(c);
    this.getStocks();
  }

  getStocks() {
    this.stockService.getStocks().subscribe(res => {
      console.log(res);
      this.stocks = res;
    });
  }

}
