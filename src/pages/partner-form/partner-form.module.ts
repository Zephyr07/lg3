import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartnerFormPage } from './partner-form';

@NgModule({
  declarations: [
    PartnerFormPage,
  ],
  imports: [
    IonicPageModule.forChild(PartnerFormPage),
  ],
})
export class PartnerFormPageModule {}
