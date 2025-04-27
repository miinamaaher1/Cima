import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WatchAreaComponent } from './components/watch-page/watch-area/watch-area.component';

export const routes: Routes = [
    // { path: "", redirectTo: "home", title: "Home", pathMatch: "full" },
    { path: "home", component: HomeComponent, title: "Home" },
    { path: "details", component: DetailsComponent, title: "Details" },
    { path: "watch", component: WatchAreaComponent, title: "watch"},
    { path: "**", component: NotFoundComponent, title: "Error" },
];
