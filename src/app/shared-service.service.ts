import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SharedServiceService {

  constructor() { }

  sharedPlots = new EventEmitter<Plotly.Data[]>();
}
