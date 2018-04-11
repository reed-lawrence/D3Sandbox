import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const w = 300;
    const h = 100;
    const padding = 2;
    const dataset = [5, 10, 14, 20, 25, 11, 25, 22, 18, 7];
    let svg = d3.select('body').append('svg')
      .attr('width', w)
      .attr('height', h);

    function ColorPicker(v: number) {
      if (v <= 20) {
        return 'gray';
      } else if (v > 20) {
        return 'red';
      }
    }
    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', function (d, i) {
        return i * (w / dataset.length);
      })
      .attr('y', function (d) {
        return h - (d);
      })
      .attr('width', w / dataset.length - padding)
      .attr('height', function (d) {
        return d;
      })
      .attr('fill', function (d) {
        return ColorPicker(d); // colorpicker.com
      });

    svg.selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(function (d) { return d; })
      .attr('text-anchor', 'middle')
      .attr('x', function (d, i) { return i * (w / dataset.length) + (w / dataset.length - padding) / 2; })
      .attr('y', function (d) { return h - d; })
  }

}
