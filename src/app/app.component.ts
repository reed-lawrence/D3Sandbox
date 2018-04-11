import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';
import { SharedServiceService } from './shared-service.service';
import { ColorPair } from './color-pair';
import { HttpClient } from '@angular/common/http';
import { QbgameLog } from './qbgame-log';
import { CsvHelperService } from './csv-helper.service';
import { QbLibrary } from './qb-library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private sharedService: SharedServiceService,
    private _http: HttpClient,
    private csvHelperService: CsvHelperService
  ) { }

  counter = 0;
  componentPlots: Plotly.Data[] = [];
  dataPlots: number[] = [];
  _QbLib: QbLibrary = new QbLibrary();


  colorArray: ColorPair[] = [
    { Border: '#2d7fb8', Fill: '#8fbbda' },
    { Border: '#ff7f0e', Fill: '#ffbf87' },
    { Border: '#2ca02c', Fill: '#96d096' },
    { Border: '#d62728', Fill: '#eb9394' },
    { Border: '#9467bd', Fill: '#cab3de' },
    { Border: '#8c564b', Fill: '#c6aba5' },
    { Border: '#e377c2', Fill: '#f1bbe1' },
    { Border: '#7f7f7f', Fill: '#bfbfbf' },
    { Border: '#bcbd22', Fill: '#dede91' },
    { Border: '#17becf', Fill: '#8bdfe7' }
  ];
  colorPosition = 2;

  AddPlot() {
    console.log('AddPlot called');
    this.counter++;
    let yTemp = [];
    for (let i = 0; i < 16; i++) {
      yTemp[i] = Math.random();
    }

    const color = this.pickColor();
    this.colorPosition++;

    let traceTemp: Plotly.Data = {
      y: yTemp,
      type: 'box',
      name: 'Plot ' + this.counter,
      marker: {
        color: color.Border
      },
      boxpoints: 'all',
      jitter: 0,
      pointpos: 0,
      boxmean: true
    }

    this.componentPlots.push(traceTemp);
    this.sharedService.sharedPlots.emit(this.componentPlots);
    //console.log(this.componentPlots);
  }

  getAvg(array: number[]) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum / array.length;
  }

  pickColor(): ColorPair {
    if (this.colorPosition >= 10) {
      this.colorPosition = 0;
    }
    return this.colorArray[this.colorPosition];
  }

  OrderByMedian() {
    console.log('OrderByMedian clicked');
    this.componentPlots.sort(
      (n1, n2) => {
        if (this.getAvg(<number[]>n1.y) < this.getAvg(<number[]>n2.y)) {
          return 1;
        } else if (this.getAvg(<number[]>n1.y) > this.getAvg(<number[]>n2.y)) {
          return -1;
        } else {
          return 0;
        }
      });
    this.sharedService.sharedPlots.emit(this.componentPlots);
  }

  GetCSV() {
    console.log('GetCSV Called');
    this._QbLib.Initialize();
    for(let i = 0; i < this._QbLib.QbList.length; i++){
      this._QbLib.QbList[i].Games = this.csvHelperService.GetQBFromCSV(this._QbLib.QbList[i].CsvGameString);
    }

    console.log(this._QbLib.QbList);
  }

  OrderByMax() {
    console.log('OrderByMax called');
    this.componentPlots.sort(
      (n1, n2) => {
        if (Math.max.apply(null, <number[]>n1.y) < Math.max.apply(null, <number[]>n2.y)) {
          return 1;
        } else if (Math.max.apply(null, <number[]>n1.y) > Math.max.apply(null, <number[]>n2.y)) {
          return -1
        } else {
          return 0;
        }
      }
    );
    this.sharedService.sharedPlots.emit(this.componentPlots);
  }

}
