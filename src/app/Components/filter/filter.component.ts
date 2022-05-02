import { Component, OnInit } from '@angular/core';
import { Options as sliderOptions } from 'ng5-slider';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  sliderMinRange: number;
  sliderMaxRange: number;
  // slider options
  sliderOptions: sliderOptions = {
    floor: 0,
    ceil: 100,
    step: 1,
  };
  constructor() {}

  ngOnInit() {
    this.sliderMinRange = 0;
    this.sliderMaxRange = 100;
  }
}
