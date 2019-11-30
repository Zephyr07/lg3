import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandListPage } from './command-list';
import {PipeModule} from "../../providers/pipe/pipe.module";

@NgModule({
  declarations: [
    CommandListPage,
  ],
  imports: [
    IonicPageModule.forChild(CommandListPage),
    PipeModule
  ],
})
export class CommandListPageModule {}
