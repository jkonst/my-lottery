import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NavMenuComponent } from './components/nav-menu.component';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { WinnersComponent } from '../winners/winners.component';
import { FormComponent } from '../lottery-forms/form/form.component';

@NgModule({
  declarations: [NavMenuComponent],
  imports:
    [
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'winners', component: WinnersComponent},
      {path: 'form', component: FormComponent},
      {path: '**', component: NotFoundComponent}
    ]),
    CommonModule,
    NgbCollapseModule
  ],
  exports: [NavMenuComponent]
})
export class NavMenuModule { }
