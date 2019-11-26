import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PartnerFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partner-form',
  templateUrl: 'partner-form.html',
})
export class PartnerFormPage {

  form:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.form={
      town:""
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerFormPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

  savePartner(){
    console.log(this.form);
  }

}
