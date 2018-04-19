import { Component, OnInit, Input } from '@angular/core';

// Service
import { StockService } from '../../services/stock.service';

// Models
import { Stock } from '../../models/stock';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {

  @Input()
  symbol: string;

  @Input()
  stock: Stock;

  data: any;

  options = {
    responsive: true,
    title: {
      display: true,
    },
    legend: {
      display: false
    }
  };

  constructor(
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.loadStockData();
  }

  loadStockData() {
    if (!this.symbol) { return; }

    this.stockService.getStockDailyData(this.symbol).subscribe(res => {
      const labels = res.map(details => details.date.toString());
      const dataset = {
        label: this.symbol,
        borderColor: 'rgb(255, 99, 132)',
        pointRadius: 2,
        fill: false,
        data: res.map(details => details.open)
      };
      this.data = {
        labels: labels,
        datasets: [dataset],
      };
    });
  }

}
