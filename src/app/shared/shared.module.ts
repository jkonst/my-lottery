import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [FileUploadComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [FileUploadComponent, FooterComponent]
})
export class SharedModule { }
