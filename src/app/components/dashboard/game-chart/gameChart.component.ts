import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { DataService } from './../../../services/api/data.service';

import * as ChartAnnotation from  'chartjs-plugin-annotation';
import * as _ from "lodash";

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'game-chart',
    templateUrl: './game-chart.html',
    providers: [DataService]
})

export class GameChartComponent implements OnChanges, OnInit {
    @Input() games: any;
    ranks: {id: string, name: string, min: number, max: number}[] = [];
    public lineChartData: Array<any> = [];
    public lineChartLabels:Array<any> = [];

    public constructor(
        private dataService: DataService
    ) {
    	let loadPluginJS = ChartAnnotation;
    }


    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if(this.ranks.length <= 0) {
            this.dataService.getRanks().subscribe(
                ranks => this.formatRanks(ranks),
                error => console.error(error)
            )
        }
        if(changes["games"] && this.games.length > 0) {
            let labels = this.games.map((game: any) => game.game_id);
            let data = this.games.map((game:any) => game.rating);

            if (this.ranks.length <= 0) {
                setTimeout( () => this.addRankStep(data), 500);
            } else {
                this.addRankStep(data)
            }

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

    addRankStep(data : number[]) {
        let max = _.max(data) + 30;
        let min = _.min(data) - 30;
        let annotations = [];
        for(let rank of this.ranks) {
            if (rank.min > min && rank.min < max) {
                annotations.push({
                    type: "line",
                    mode: "horizontal",
                    drawTime: 'afterDraw',
                    scaleID: 'y-axis-0',
                    id: rank.name,
                    value: rank.min,
                    borderColor: "blue",
                    borderWidth: 1
                })
            }
        }

        this.lineChartOptions = {
            annotation: {
                annotations: annotations
            },
            responsive: true
        }
    }

    private formatRanks(ranks: {id: string, name: string, range: string}[]) {
        for(let rank of ranks) {
            let range = rank.range;
            let rangeArray = range.slice(1, range.length-1).split(",").map(str => Number(str));
            this.ranks.push({
                id: rank.id,
                name: rank.name,
                min: rangeArray[0],
                max: rangeArray[1] ? rangeArray[1] : null
            });
        }
    }

    // tooltipLabel(tooltipItem:any, data:any) {
    //     console.log(tooltipItem);
    //     let result:string = "Score: "+tooltipItem.xLabel+"\n";
    //     if(this.scores[tooltipItem.index-1] !== null) {
    //         let value = tooltipItem.xLabel-this.scores[tooltipItem.index-1];
    //         result += "";
    //     }
    // }
}
