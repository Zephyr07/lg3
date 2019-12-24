import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {InfoPage} from "../info/info";
import {CommandListPage} from "../command-list/command-list";
import {PartnerPage} from "../partner/partner";
import {AuthProvider} from "../../providers/auth/auth";
import {Storage} from "@ionic/storage";
import {ApiProvider} from "../../providers/api/api";
import {ShopListPage} from "../shop-list/shop-list";
import {PolitiquePage} from "../politique/politique";
import {ConditionsPage} from "../conditions/conditions";
import {LoginPage} from "../login/login";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  info=InfoPage;
  politique=PolitiquePage;
  condition=ConditionsPage;
  command=CommandListPage;
  partner=PartnerPage;
  state_log=false;
  shop=ShopListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
              private auth : AuthProvider, private storage: Storage, private api : ApiProvider) {

    this.checkLogin("");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  openPage(t){
    console.log(t);
    if(t==InfoPage || t==CommandListPage){
      // verification si connecté
      this.checkLogin(t);
    }
    else{
      this.navCtrl.push(t)
    }
  }

  logout(){
    this.auth.logout().then(d=>{
      this.api.doToast('Déconnecté',2000);
      this.storage.set('user',undefined);
      this.state_log=false;
    })
  }

  checkLogin(t){

    this.storage.get("user").then(d=>{
      if(d==undefined || d==null){
        if(t!=""){
          this.presentProfileModal();
        }
      }
      else{
        if(t!=""){
          this.navCtrl.push(t,{user_id:d.id});
        }
        this.state_log=true;
      }
    })
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(LoginPage);
    profileModal.present();
  }
}

