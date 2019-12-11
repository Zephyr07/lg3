import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {LoadingProvider} from "../../providers/loading/loading";

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

  form={title:"",name:"",town_id:"",phone:""};
  towns=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private api : ApiProvider,private load : LoadingProvider) {
    this.getTowns();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerFormPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

  savePartner(){
    this.load.show("Enregistrement...",false);
    this.form.name=this.navParams.get('target')+"|"+this.form.title;
    console.log(this.form);
    this.api.Partners.post(this.form).subscribe(d=>{
      console.log(d);
      this.api.doToast("Vos données ont bien été enregistrées, nous revenons vers vous",3000);
      this.navCtrl.pop();
      this.form={title:"",name:"",town_id:"",phone:""};
      this.load.close();
    },d=>{
      this.load.close();
      this.api.doToast("Erreur dans le chargement des données, merci de réessayer plus tard",3000);
    })
  }

  getTowns(){
    this.load.show("des villes",true);
    this.api.Towns.getList().subscribe(data=>{
      this.towns=data;
      this.load.close();
    })
  }
}
