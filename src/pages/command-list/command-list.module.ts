import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandListPage } from './command-list';

@NgModule({
  declarations: [
    CommandListPage,
  ],
  imports: [
    IonicPageModule.forChild(CommandListPage),
  ],
})
export class CommandListPageModule {}
