import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPage } from './payment';
import {PipeModule} from "../../providers/pipe/pipe.module";

@NgModule({
  declarations: [
    PaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentPage),
    PipeModule,
  ],
})
export class PaymentPageModule {}
