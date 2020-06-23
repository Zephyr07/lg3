import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockistPage } from './stockist';
import {PipeModule} from "../../providers/pipe/pipe.module";

@NgModule({
  declarations: [
    StockistPage,
  ],
  imports: [
    IonicPageModule.forChild(StockistPage),
    PipeModule
  ],
})
export class StockistPageModule {}
