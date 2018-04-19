import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

// Models
import { Company } from '../models/company';

@Injectable()
export class StockService {

  constructor(
    private http: HttpClient
  ) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`./assets/companylist.json`);
  }

}
