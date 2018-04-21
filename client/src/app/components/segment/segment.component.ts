import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Segment } from '../../models/segment';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss']
})
export class SegmentComponent implements OnInit {

  @Input()
  segments: Segment[];

  @Output()
  select: EventEmitter<Segment> = new EventEmitter<Segment>();

  selectedSegment: Segment;

  constructor() { }

  ngOnInit() {
    this.selectSegment(this.segments[0]);
  }

  selectSegment(segment: Segment) {
    this.selectedSegment = segment;
    this.select.emit(segment);
  }

}
