import { deserializeAs } from 'cerialize';

export class Company {
  @deserializeAs('Symbol') public symbol: string;
  @deserializeAs('Name') public name: string;
  @deserializeAs('IPOyear') public ipoYear: string;
  @deserializeAs('Sector') public sector: string;
  @deserializeAs('Industry') public industry: string;
  @deserializeAs('SummaryQuote') public summaryQuote: string;
}
