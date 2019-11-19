import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {BillStatutPipe} from "./bill-statut";
import {LimitToPipe} from "./limit-to";
import {PriceFormatPipe} from "./price-format";

@NgModule({
  declarations: [
    BillStatutPipe,
    LimitToPipe,
    PriceFormatPipe,
  ],
  imports: [IonicModule],
  exports: [
    BillStatutPipe,
    LimitToPipe,
    PriceFormatPipe,
  ]
})
export class PipeModule {
}
