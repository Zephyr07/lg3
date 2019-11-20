import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CommandPage} from "../command/command";

/**
 * Generated class for the CommandListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-command-list',
  templateUrl: 'command-list.html',
})
export class CommandListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandListPage');
  }


  detailCommand(id){
    let profileModal = this.modalCtrl.create(CommandPage, { id: id });
    profileModal.present();
  }
}
