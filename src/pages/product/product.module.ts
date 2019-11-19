import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import {PipeModule} from "../../providers/pipe/pipe.module";

@NgModule({
  declarations: [
    ProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductPage),
    PipeModule
  ],
})
export class ProductPageModule {}
