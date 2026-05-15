import { Routes } from '@angular/router';
import { ArtiklComponent } from './main/artikl/artikl.component';
import { DobavljacComponent } from './main/dobavljac/dobavljac.component';
import { PorudzbinaComponent } from './main/porudzbina/porudzbina.component';
import { StavkaPorudzbineComponent } from './main/stavka-porudzbine/stavka-porudzbine.component';
import { AboutComponent } from './utility/about/about.component';
import { AuthorComponent } from './utility/author/author.component';
import { HomeComponent } from './utility/home/home.component';

export const routes: Routes = [
    {path: 'artikl', component: ArtiklComponent},
    {path: 'dobavljac', component: DobavljacComponent},
    {path: 'porudzbina', component: PorudzbinaComponent},
    {path: 'stavka-porudzbina', component: StavkaPorudzbineComponent},
    {path: 'author', component: AuthorComponent},
    {path: 'about', component: AboutComponent},
    {path: '', component: HomeComponent, pathMatch:'full'}
];
