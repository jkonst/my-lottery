import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { NavMenuModule } from './nav-menu/nav-menu.module';
import { WinnersComponent } from './winners/winners.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    WinnersComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    NavMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
