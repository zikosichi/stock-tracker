import { Component, OnInit, Input } from '@angular/core';

// Service
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {

  @Input()
  symbol: string;

  data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  options = {
    responsive: true,
    maintainAspectRatio: false
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
      console.log(res);
    });
  }

}
