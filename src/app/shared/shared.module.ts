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
    FormsModule
  ],
  exports: [
    NgbModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class SharedModule { }
