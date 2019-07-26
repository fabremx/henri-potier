import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    NgbModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    NgbModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ]
})
export class SharedModule { }
