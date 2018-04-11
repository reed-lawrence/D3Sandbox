import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import * as d3 from 'd3';
import * as Plotly from 'plotly.js';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BoxPlotComponent } from './box-plot/box-plot.component';
import { SharedServiceService } from './shared-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CsvHelperService } from './csv-helper.service';


@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    LineChartComponent,
    BoxPlotComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    SharedServiceService,
    CsvHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
