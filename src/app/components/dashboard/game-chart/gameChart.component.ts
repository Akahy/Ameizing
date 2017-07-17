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
        if(changes["games"] && this.games.length > 0) {
            let labels = this.games.map((game: any) => game.game_id);
            let data = this.games.map((game:any) => game.rating);
            data = data.reverse();
            setTimeout(() => this.lineChartLabels = labels.reverse());
            this.lineChartData = [{
                data: data,
                label: "Season "+this.games[0].season.id,
                lineTension: 0.2,
                spanGaps: false
            }];
            this.lineChartOptions.scales = {};
        }
        else {
            let scales = {
                yAxes: [{
                  ticks: {
                    max: 3400,
                    min: 1600,
                  }
                }]
            };
            this.lineChartOptions.scales = scales; //FIXME : only working on 1st load ...
            this.lineChartLabels = [];
            this.lineChartData = [{
                data: [],
                label: "No game for the current season"
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
}
