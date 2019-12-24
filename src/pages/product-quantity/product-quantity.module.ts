import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductQuantityPage } from './product-quantity';
import {PipeModule} from "../../providers/pipe/pipe.module";

@NgModule({
  declarations: [
    ProductQuantityPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductQuantityPage),
    PipeModule
  ],
})
export class ProductQuantityPageModule {}
