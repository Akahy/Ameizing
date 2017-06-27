import { Routes } from '@angular/router';

import { DashboardComponent }  from './../dashboard/dashboard.component';

export const routerConfig: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    // {
    //     path: 'stats',
    //     component: StatsComponent
    // },
    // {
    //     path: 'lab',
    //     component: LabComponent
    // },
    // {
    //     path: 'achievments',
    //     component: AchievmentsComponent
    // },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
