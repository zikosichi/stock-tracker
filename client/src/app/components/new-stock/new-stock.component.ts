import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// Models
import { Stock } from '../../models/stock';
import { IfObservable } from 'rxjs/observable/IfObservable';

@Component({
  selector: 'app-new-stock',
  templateUrl: './new-stock.component.html',
  styleUrls: ['./new-stock.component.scss']
})
export class NewStockComponent implements OnInit {

  @Output()
  select: EventEmitter<Stock> = new EventEmitter<Stock>();
  model: string;

  companies: Stock[] = [];

  // Format input
  formatter = (x: { name: string}) => x.name;

  // Filter results
  search = (text$: Observable<string>) =>
    text$
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.companies.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))

  constructor(
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.stockService.getCompanies().subscribe(res => {
      this.companies = res;
    });
  }

  /**
   * On company select
   *
   * @param {*} c
   * @memberof NewStockComponent
   */
  onCompanySelect(c: any) {
    this.select.emit(c.item);
    setTimeout(() => {
      this.model = '';
    });
  }

}
