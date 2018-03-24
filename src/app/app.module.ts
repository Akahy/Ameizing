import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';

//Top menu routes
import { RouterModule, Routes } from '@angular/router';
import { routerConfig } from './components/top-menu/topMenu.config';

//Components
import { AppComponent }  from './app.component';
import { TopMenuComponent }  from './components/top-menu/topMenu.component';
import { DashboardComponent }  from './components/dashboard/dashboard.component';
import { GameChartComponent } from './components/dashboard/game-chart/gameChart.component';
import { GamesDetailsComponent } from './components/dashboard/games-details/gamesDetails.component';
import { EditGameComponent } from './components/dashboard/games-details/edit-game/editGame.component';
import { HeroSelectionComponent } from './components/dashboard/games-details/hero-selection/heroSelection.component';
import { HeroComponent } from './components/shared/hero/hero.component';
import { MostPlayedComponent } from './components/dashboard/most-played/mostPlayed.component';

//Pipes
import { TimePipe } from './utils/time.pipe';

@NgModule({
    imports:      [
        BrowserModule,
        RouterModule.forRoot(routerConfig),
        FormsModule,
        ChartsModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        TopMenuComponent,
        DashboardComponent,
        GameChartComponent,
        GamesDetailsComponent,
        EditGameComponent,
        HeroSelectionComponent,
        HeroComponent,
        MostPlayedComponent,
        TimePipe
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
