import { Component } from '@angular/core';

@Component({
    moduleId: module.id.replace("/dist/", "/"),
    selector: 'game-chart',
    templateUrl: './game-chart.html'
})

export class GameChartComponent {

    scores = [
        2120,
        null,
        null,
        2400,
        2400,
        2300,
        2150,
        2200,
        2230,
        2200,
        2210,
        2210
    ]

    public lineChartOptions:any = {
        scales: {
            yAxes: [{
                ticks: {
                    max: this.getMax(),
                    min: this.getMin(),
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: this.tooltipLabel
            }
        },
        responsive: true
    };

    public lineChartData: Array<any> = [
        {data: this.scores, label: 'Season 4', lineTension: 0.2, spanGaps: false}

    ]

    public lineChartLabels:Array<any> = [
        18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
    ]

    public lineChartColors:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ]

    tooltipLabel(tooltipItem:any, data:any) {
        console.log(tooltipItem);
        let result:string = "Score: "+tooltipItem.xLabel+"\n";
        if(this.scores[tooltipItem.index-1] !== null) {
            let value = tooltipItem.xLabel-this.scores[tooltipItem.index-1];
            result += "";
        }
    }

    getMax() {
        return Math.max.apply(null, this.scores) + 50;
    }

    getMin() {
        let result = 3000;
        for(let score of this.scores) {
            if (score !== null && score < result) {
                result = score;
            }
        }
        return result - 50;
    }

}
