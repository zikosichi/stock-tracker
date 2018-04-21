import { deserializeAs } from 'cerialize';

export class Stock {
  @deserializeAs('Symbol') public symbol: string;
  @deserializeAs('Name') public name: string;
  @deserializeAs('IPOyear') public ipoYear: string;
  @deserializeAs('Sector') public sector: string;
  @deserializeAs('Industry') public industry: string;
  @deserializeAs('SummaryQuote') public summaryQuote: string;
  @deserializeAs('stockQuotes') public stockQuotes: StockQuotes;
}

export class StockQuotes {
  @deserializeAs('1. symbol') public symbol: string;
  @deserializeAs('2. price') public price: number;
  @deserializeAs('3. volume') public volume: number;
  @deserializeAs('4. timestamp') public timestamp: Date;

  public static OnDeserialized(instance: StockQuotes, json: any): void {
    instance.volume = Number.isInteger(instance.volume) ? instance.volume : 0;
  }
}

export class StockDetails {
  @deserializeAs('date') public date: Date;
  @deserializeAs('1. open') public open: string;
  @deserializeAs('2. high') public high: number;
  @deserializeAs('3. low') public low: number;
  @deserializeAs('4. close') public close: Date;
  @deserializeAs('5. volume') public volume: Date;
}
