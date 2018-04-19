import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewStockComponent } from './components/new-stock/new-stock.component';

// Ng bootstrap
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

// Services
import { StockService } from './services/stock.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NewStockComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbTypeaheadModule.forRoot(),
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
