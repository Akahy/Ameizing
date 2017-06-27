import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//Top menu routes
import { RouterModule, Routes } from '@angular/router';
import { routerConfig } from './components/top-menu/topMenu.config';

//Components
import { AppComponent }  from './app.component';
import { TopMenuComponent }  from './components/top-menu/topMenu.component';
import { DashboardComponent }  from './components/dashboard/dashboard.component';

@NgModule({
  imports:      [ BrowserModule,
                  RouterModule.forRoot(routerConfig),
                  FormsModule
   ],
  declarations: [ AppComponent,
                  TopMenuComponent,
                  DashboardComponent
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
