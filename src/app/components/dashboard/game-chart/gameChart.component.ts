import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { DataService } from './../../../services/api/data.service';

import * as _ from "lodash";
import * as ChartAnnotation from  'chartjs-plugin-annotation';
import * as rankColor from './rankColor.json';

@Component({
    selector: 'game-chart',
    templateUrl: './game-chart.html',
    styleUrls: ['./game-chart.sass'],
    providers: [DataService]
})

export class GameChartComponent implements OnChanges {
    @Input() games: any;
    ranks: {id: string, name: string, min: number, max: number}[] = [];
    public lineChartData: Array<any> = [];
    public lineChartLabels:Array<any> = [];
    public lineChartOptions:any = {};

    tooltipOptions = {
        mode: 'index',
        intersect: false,
        displayColors: false,
        callbacks: {
            title: (tooltipItem, data) => this.games[this.games.length-1 - tooltipItem[0].index].rating,
            label: (tooltipItem, data) => {
                let  game = "#" + tooltipItem.xLabel;
                let date = new Date(this.games[this.games.length-1 - tooltipItem.index].played);
                return game + " - " + date.toLocaleDateString();
            },
            footer: (tooltipItem, data) => {
                if (this.games[this.games.length-1 - tooltipItem[0].index].map)
                    return this.games[this.games.length-1 - tooltipItem[0].index].map.name
                return null;
            }
        },
        titleFontSize: 14,
        titleFontColor: '#000',
        bodyFontColor: '#000',
        footerFontColor: '#000',
        footerFontStyle: 'normal',

        backgroundColor: '#fff',
        borderColor: '#9542f4',
        borderWidth: 0.5

    };

    public constructor(
        private dataService: DataService
    ) {
    	let loadPluginJS = ChartAnnotation;
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes["games"] && this.games.length > 0) {
            let labels = this.games.map((game: any) => game.game_id);
            let data = this.games.map((game:any) => game.rating);

            if(this.ranks.length <= 0) {
                this.dataService.getRanks().subscribe(
                    ranks => {this.formatRanks(ranks); this.addRankStep(data)},
                    error => console.error(error)
                )
            }
            else {
                this.addRankStep(data);
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
            this.lineChartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                      ticks: {
                        max: 3400,
                        min: 1600,
                      }
                    }]
                }
            };
            setTimeout(()=> this.lineChartLabels = []);
            this.lineChartData = [{
                data: [],
                label: "No game for the current season"
            }];
       }
    }

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
                    borderColor: rankColor[rank.name],
                    borderWidth: 1
                })
            }
        }

        this.lineChartOptions = {
            annotation: {
                annotations: annotations
            },
            maintainAspectRatio: false,
            responsive: true,
            tooltips: this.tooltipOptions
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
}
