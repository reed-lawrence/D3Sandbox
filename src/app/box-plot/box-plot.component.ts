import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Plotly from 'plotly.js';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-box-plot',
  templateUrl: './box-plot.component.html',
  styleUrls: ['./box-plot.component.css']
})
export class BoxPlotComponent {

  constructor(
    private sharedService: SharedServiceService
  ) {
    sharedService.sharedPlots.subscribe(
      data => {
        console.log('Shared service data received from emitter');
        this.plots = [];
        this.plots = data;
        Plotly.newPlot('myDiv', this.plots);
      }
    )
   }

  plots: Plotly.Data[] = [];


  // ngOnChanges(changes: SimpleChanges){
  //   console.log('changed');
  //   Plotly.newPlot('myDiv', this.plots);
  // }

  // ngOnInit() {
  //   // var y0 = [], y1 = []
  //   // for (let i = 0; i < 50; i++) {
  //   //   y0[i] = Math.random();
  //   //   y1[i] = Math.random();
  //   // }

  //   // var trace1: Plotly.Data = {
  //   //   y: y0,
  //   //   type: 'box'
  //   // };

  //   // var trace2: Plotly.Data = {
  //   //   y: y1,
  //   //   type: 'box',
  //   //   name: 'test 2'
  //   // };

  //   // this.plots.push(trace1);
  //   // this.plots.push(trace2);

  //   // // let data: Plotly.Data[] = [trace1, trace2];

  //   // // Plotly.newPlot('myDiv', data);
  //   Plotly.newPlot('myDiv', this.plots);
  // }

}
