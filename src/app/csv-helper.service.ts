import { Injectable } from '@angular/core';
import { QbgameLog } from './qbgame-log';

@Injectable()
export class CsvHelperService {

  constructor() { }

  GetQBFromCSV(csvString: string): QbgameLog[] {
    const arr = csvString.split('\n');
    let jsonObj = [];
    let headers = arr[0].split(',');
    for (let i = 1; i < arr.length; i++) {
      let data = arr[i].split(',');
      let obj = {};
      for (let j = 0; j < data.length; j++) {
        // console.log('Trimming: headers[' + j + ']=' + headers[j] + ' and data[' + j + ']=' + data[j]);
        try {
          obj[headers[j].trim()] = data[j].trim();
        }
        catch{
          console.log('Excess data');
        }
      }
      jsonObj.push(obj);
    }

    let output: QbgameLog[] = [];
    for (let i = 0; i < jsonObj.length; i++) {
      let game = new QbgameLog();
      game.Wk = parseInt(jsonObj[i].Wk);
      game.Cmp = parseInt(jsonObj[i].Cmp);
      game.PaAtt = parseInt(jsonObj[i].PaAtt);
      game.PaYds = parseInt(jsonObj[i].PaYds);
      game.PaTD = parseInt(jsonObj[i].PaTD);
      game.Int = parseInt(jsonObj[i].Int);
      game.Sk = parseInt(jsonObj[i].Sk);
      game.SkYds = parseInt(jsonObj[i].SkYds);
      game.RuAtt = parseInt(jsonObj[i].RuAtt);
      game.RuTD = parseInt(jsonObj[i].RuTD);

      output.push(game);
    }
    return output;
  }
}
