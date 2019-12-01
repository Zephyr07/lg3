import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoPage } from './info';
import {PipeModule} from "../../providers/pipe/pipe.module";

@NgModule({
  declarations: [
    InfoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoPage),
    PipeModule
  ],
})
export class InfoPageModule {}
