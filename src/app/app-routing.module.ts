import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormComponent } from './lottery-forms/form/form.component';
import { WinnersComponent } from './winners/winners.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'winners',
    component: WinnersComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
