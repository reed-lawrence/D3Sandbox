import { Injectable } from '@angular/core';
import { Scoring } from './scoring';
import { Qb } from './qb';
import { QbgameLog } from './qbgame-log';

@Injectable()
export class ScoringService {

  constructor() { }

  GetScore(scoringRule: Scoring, game: any): number {
    let score = 0;
    if (game instanceof QbgameLog) {
      score += (game.PaYds * scoringRule.PaYa) / scoringRule.PaYaInterval;
    }

    return score;
  }

}
