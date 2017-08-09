import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts';

//Top menu routes
import { RouterModule, Routes } from '@angular/router';
import { routerConfig } from './components/top-menu/topMenu.config';

//Components
import { AppComponent }  from './app.component';
import { TopMenuComponent }  from './components/top-menu/topMenu.component';
import { DashboardComponent }  from './components/dashboard/dashboard.component';
import { RecentGamesComponent } from './components/dashboard/recent-games/recentGames.component';
import { GameChartComponent } from './components/dashboard/game-chart/gameChart.component';
import { GamesDetailsComponent } from './components/dashboard/games-details/gamesDetails.component';
import { HeroSelectionComponent } from './components/dashboard/games-details/hero-selection/heroSelection.component';
import { HeroComponent } from './components/shared/hero/hero.component';
import { MostPlayedComponent } from './components/dashboard/most-played/mostPlayed.component';


@NgModule({
    imports:      [
        BrowserModule,
        RouterModule.forRoot(routerConfig),
        FormsModule,
        ChartsModule,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        TopMenuComponent,
        DashboardComponent,
        RecentGamesComponent,
        GameChartComponent,
        GamesDetailsComponent,
        HeroSelectionComponent,
        HeroComponent,
        MostPlayedComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
