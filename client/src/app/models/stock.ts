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
}
