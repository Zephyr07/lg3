import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopListPage } from './shop-list';
import {PipeModule} from "../../providers/pipe/pipe.module";

@NgModule({
  declarations: [
    ShopListPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopListPage),
    PipeModule
  ],
})
export class ShopListPageModule {}
