import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductListPage } from './product-list';
import {PipeModule} from "../../providers/pipe/pipe.module";

@NgModule({
  declarations: [
    ProductListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductListPage),
    PipeModule,
  ],
})
export class ProductListPageModule {}
