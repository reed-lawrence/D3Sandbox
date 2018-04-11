import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

export type DataType = {month: any, sales: any}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const h = 100;
    const w = 200;
    const monthlySales: DataType[] = [
      { 'month': 10, 'sales': 20 },
      { 'month': 20, 'sales': 14 },
      { 'month': 30, 'sales': 20 },
      { 'month': 40, 'sales': 21 },
      { 'month': 50, 'sales': 15 },
      { 'month': 60, 'sales': 22 },
      { 'month': 70, 'sales': 9 },
      { 'month': 80, 'sales': 6 },
      { 'month': 90, 'sales': 23 },
      { 'month': 100, 'sales': 7 }
    ];

    let lineFun = d3.svg.line<DataType>()
      .x(function (d) { return d.month * 2; })
      .y(function (d) { return d.sales })
      .interpolate('linear');

    let svg = d3.select('body').append('svg')
      .attr('width', w)
      .attr('height', h);

    let viz = svg.append('path')
    .attr('d', lineFun(monthlySales))
    .attr('stroke', 'purple')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  }

}
