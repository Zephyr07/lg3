import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CommandPage} from "../command/command";
import {ApiProvider} from "../../providers/api/api";
import {LoadingProvider} from "../../providers/loading/loading";

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

  bills=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private api : ApiProvider, private load : LoadingProvider) {
    // recuperation du customer
    this.load.show("des commandes",true);
    this.api.Customers.getList({user_id:this.navParams.get('user_id')}).subscribe(d=>{
      this.getBills(d[0].id);
    },d=>{
      this.load.close();
      this.api.doToast("Erreur dans le chargement des données, merci de reessayer plus tard",3000);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandListPage');
  }


  detailCommand(id){
    let profileModal = this.modalCtrl.create(CommandPage, { id: id });
    profileModal.present();
  }

  getBills(id){
    this.api.Bills.getList({should_paginate:false,customer_id:id,'_sort':'updated_at', '_sortDir':'desc'}).subscribe(d=>{
      console.log("a",d);
      this.load.close();
      this.bills=d;
    },d=>{
      this.load.close();
      this.api.doToast("Erreur dans le chargement des données, merci de reessayer plus tard",3000);
    })
  }
}
