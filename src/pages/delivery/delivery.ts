import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {Storage} from "@ionic/storage";
import {LoadingProvider} from "../../providers/loading/loading";

/**
 * Generated class for the DeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {
  towns=[];
  bill_id:number;
  mode:string;
  road="";
  information="";
  district="";
  town_id=0;
  dd={};

  constructor(public navCtrl: NavController, public navParams: NavParams, private api : ApiProvider,
              public alertCtrl: AlertController, private storage: Storage, private load : LoadingProvider) {
    let d=new Date();
    this.bill_id=this.navParams.get("bill_id");
    this.getTowns();
    this.mode=this.navParams.get('mode');
    let max_date="";
    let state_express=false;
    if(this.mode=='normal'){

      max_date=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()+3);
      let j=d.getDate()+3;
      if([0,2,4,6,7,9,11].indexOf(d.getMonth())>=0){
        // mois de 31 jours
        if(j>31){
          max_date=d.getFullYear()+"-"+(d.getMonth()+2)+"-"+(j%31)
        }
      }
      else if(d.getMonth()==1){
        // mois de 28 jours
        if(j>28){
          max_date=d.getFullYear()+"-"+(d.getMonth()+2)+"-"+(j%28)
        }
      }
      else{
        // mois de 30 jours
        if(j>30){
          max_date=d.getFullYear()+"-"+(d.getMonth()+2)+"-"+(j%30)
        }
      }
    }
    else{
      max_date=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate()+3);
      let j=d.getDate()+1;
      if([0,2,4,6,7,9,11].indexOf(d.getMonth())>=0){
        // mois de 31 jours
        if(j>31){
          max_date=d.getFullYear()+"-"+(d.getMonth()+2)+"-"+(j%31)
        }
      }
      else if(d.getMonth()==1){
        // mois de 28 jours
        if(j>28){
          max_date=d.getFullYear()+"-"+(d.getMonth()+2)+"-"+(j%28)
        }
      }
      else{
        // mois de 30 jours
        if(j>30){
          max_date=d.getFullYear()+"-"+(d.getMonth()+2)+"-"+(j%30)
        }
      }
    }
    this.dd={
      is_express: state_express,
      road: "",
      bill_id: this.bill_id,
      town_id: "",
      district: "",
      status: "new",
      information: "",
      delivery_date: d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":00",
      delivery_max_date: max_date+" "+d.getHours()+":"+d.getMinutes()+":00"
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryPage');
  }

  getTowns(){
    this.api.Towns.getList({status:1}).subscribe(data=>{
      this.towns=data;
    })
  }

  saveDelivery(){
    this.load.show("Enregistrement",false);
    console.log(this.dd);

    this.api.Deliveries.post(this.dd).subscribe(data=>{
      this.load.close();
      console.log("succes",data);
      let text="";
      if(this.mode=='normal'){
        text="Votre commande a bien été enregistrée. Votre livraison sera effectuée en <strong class='vert'>3 jours maximum</strong>. Notre équipe de livraison prendra attache avec vous.";
      }
      else{
        text="Votre commande a bien été enregistrée. Votre livraison sera effectuée en <strong class='vert'>1 jour maximum</strong>. Notre équipe de livraison prendra attache avec vous.";
      }


      const prompt = this.alertCtrl.create({
        title: 'Merci pour votre achat',
        message: text,
        buttons: [
          {
            text: 'Fermer',
            handler: data => {
              console.log('Saved clicked');
              this.storage.set('commande',undefined).then(d=>{
                this.navCtrl.popAll();
              });

            }
          }
        ]
      });
      prompt.present();
    },d=>{
      this.load.close();
      this.api.doToast("Merci de renseigner tous les champs",3000);
    })
  }

}
