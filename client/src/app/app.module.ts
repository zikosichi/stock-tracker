import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app.component';
import { NewStockComponent } from './components/new-stock/new-stock.component';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { SegmentComponent } from './components/segment/segment.component';

// Ng bootstrap
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

// Services
import { StockService } from './services/stock.service';
import { SharedService } from './services/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    NewStockComponent,
    StockDetailsComponent,
    SegmentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbTypeaheadModule.forRoot(),
  ],
  providers: [
    StockService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
