import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { NavMenuModule } from './nav-menu/nav-menu.module';
import { WinnersComponent } from './winners/winners.component';
import { LotteryFormsModule } from './lottery-forms/lottery-forms.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WinnersComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    NavMenuModule,
    LotteryFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
