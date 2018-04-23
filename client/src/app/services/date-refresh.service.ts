import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Segment } from '../models/segment';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DateRefreshService {

  refreshInterval: any;
  $onRefreshIntervalTick: Subject<Segment> = new Subject<Segment>();

  constructor() { }

  /**
   * Sets the refresh interval
   *
   * @param {number} interval
   * @memberof AppComponent
   */
  setRefreshTimer(segment: Segment) {
    clearInterval(this.refreshInterval);

    this.refreshInterval = setInterval(() => {
      this.$onRefreshIntervalTick.next();
    }, segment.value);
  }

}
