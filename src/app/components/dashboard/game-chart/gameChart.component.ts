import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'game-chart',
    templateUrl: './game-chart.html'
})

export class GameChartComponent implements OnChanges {
  @Input() games: any;
  public lineChartData: Array<any> = [];
  public lineChartLabels:Array<any> = [];

  ngOnChanges(changes: SimpleChanges) {
      if(changes["games"]) {
        let labels = this.games.map((game: any) => game.game_id));
        let data = this.games.map((game:any) => game.rating ));
        this.lineChartLabels = labels.reverse();
        this.lineChartData = [{
          data: data.reverse(),
          label: "Season "+this.games[0].seasons_id,
          lineTension: 0.2,
          spanGaps: false
        }];
    }
  }

  public lineChartOptions:any = {
      // tooltips: {
      //     callbacks: {
      //         label: this.tooltipLabel
      //     }
      // },
      responsive: true
  };

  public lineChartColors:Array<any> = [
      {
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#9542f4',
          pointBackgroundColor: '#6d27bc',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#6d27bc'
      }
  ]

  // tooltipLabel(tooltipItem:any, data:any) {
  //     console.log(tooltipItem);
  //     let result:string = "Score: "+tooltipItem.xLabel+"\n";
  //     if(this.scores[tooltipItem.index-1] !== null) {
  //         let value = tooltipItem.xLabel-this.scores[tooltipItem.index-1];
  //         result += "";
  //     }
  // }
  //
  // getMax() {
  //     return Math.max.apply(null, this.scores) + 50;
  // }
  //
  // getMin() {
  //     let result = 3000;
  //     for(let score of this.scores) {
  //         if (score !== null && score < result) {
  //             result = score;
  //         }
  //     }
  //     return result - 50;
  // }

}
