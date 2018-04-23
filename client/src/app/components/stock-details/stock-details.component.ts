import { Component, OnInit, Input, OnDestroy } from '@angular/core';

// Service
import { StockService } from '../../services/stock.service';
import { DateRefreshService } from '../../services/date-refresh.service';

// Models
import { Stock } from '../../models/stock';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit, OnDestroy {

  @Input()
  symbol: string;

  @Input()
  stock: Stock;

  data: any;
  subscription: any;
  refreshInterval: any;
  isUpdatingData = false;

  options: any = {
    responsive: true,
    title: {
      display: true,
    },
    legend: {
      display: false
    }
  };

  constructor(
    private stockService: StockService,
    private dateRefreshService: DateRefreshService,
  ) { }

  ngOnInit() {
    this.loadStockData();

    this.subscription = this.dateRefreshService.$onRefreshIntervalTick.subscribe(res => {
      this.loadStockData();
    });
  }

  /**
   * Load stock details data
   *
   * @returns
   * @memberof StockDetailsComponent
   */
  loadStockData() {
    if (!this.symbol) { return; }

    this.isUpdatingData = true;
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
      this.isUpdatingData = false;
    });
  }


  /**
   * Unsubscribe interval change on Destroy
   *
   * @memberof StockDetailsComponent
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
