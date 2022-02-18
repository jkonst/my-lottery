import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbCollapseModule, MatToolbarModule, MatProgressSpinnerModule],
  declarations: [HeaderComponent, FooterComponent, NotFoundComponent, SpinnerComponent],
  exports: [HeaderComponent, NotFoundComponent, FooterComponent, SpinnerComponent],
})
export class UiModule {}
