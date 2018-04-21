import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Segment } from '../models/segment';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

  onRefreshIntervalChange: Subject<Segment> = new Subject<Segment>();

  constructor() { }

}
