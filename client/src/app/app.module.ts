import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewStockComponent } from './components/new-stock/new-stock.component';

// Services
import { StockService } from './services/stock.service';

@NgModule({
  declarations: [
    AppComponent,
    NewStockComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
