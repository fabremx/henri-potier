import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    NgbModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [
    NgbModule,
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
