import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [],
  imports: [
    CommonModule],
  exports: [MatFormFieldModule, MatSelectModule, MatButtonModule,MatIconModule]

})
export class MaterialModule {
}
