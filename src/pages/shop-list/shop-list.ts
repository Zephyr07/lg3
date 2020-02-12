import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {PartnerFormPage} from "../partner-form/partner-form";
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the ShopListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-list',
  templateUrl: 'shop-list.html',
})
export class ShopListPage {
  partners=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl : ModalController, private api:ApiProvider) {
    this.getPartners();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopListPage');
  }

  becomePartner(){
    let profileModal = this.modalCtrl.create(PartnerFormPage, { target: 'Stockiste'});
    profileModal.present();
  }

  getPartners(){
    this.api.Partners.getList({'_includes':'town','_sort':'name','_sortDir':'asc'}).subscribe(d=>{
      console.log(d);
      let t=[];
      d.forEach(function(v,k){
        t.push({
          name:v.name.split(':')[0],
          district:v.name.split(':')[1],
          phone:v.phone,
          town:v.town
        })
      });
      this.partners=t;
      console.log(this.partners);
    })
  }

}
