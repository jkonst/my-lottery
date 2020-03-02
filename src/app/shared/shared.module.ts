import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './components/progress/progress.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [ProgressComponent, FileUploadComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [ProgressComponent, FileUploadComponent, FooterComponent]
})
export class SharedModule { }
