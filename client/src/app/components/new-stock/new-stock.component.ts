import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-new-stock',
  templateUrl: './new-stock.component.html',
  styleUrls: ['./new-stock.component.scss']
})
export class NewStockComponent implements OnInit {

  constructor(
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.stockService.getCompanies().subscribe(res => {
      console.log(res);
    });
  }

}
