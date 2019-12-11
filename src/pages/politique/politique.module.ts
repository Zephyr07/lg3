import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PolitiquePage } from './politique';

@NgModule({
  declarations: [
    PolitiquePage,
  ],
  imports: [
    IonicPageModule.forChild(PolitiquePage),
  ],
})
export class PolitiquePageModule {}
