import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewStockComponent } from './components/new-stock/new-stock.component';

// Services
import { StockService } from './services/stock.service';

@NgModule({
  declarations: [
    AppComponent,
    NewStockComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
