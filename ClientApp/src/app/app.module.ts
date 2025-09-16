import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { SanctionedEntitiesComponent } from './components/sanctioned-entities/sanctioned-entities.component';
import { JumbotronCounterComponent } from './components/jumbotron-counter/jumbotron-counter.component';
import { SanctionedEntityAddComponent } from './components/sanctioned-entity-add/sanctioned-entity-add.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    SanctionedEntitiesComponent,
    SanctionedEntityAddComponent,
    JumbotronCounterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'sanctioned-entities', component: SanctionedEntitiesComponent },
      { path: 'sanctioned-entities/add', component: SanctionedEntityAddComponent  },
      { path: '**', redirectTo: '' }  // Wildcard route for a 404 page can be added here
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
