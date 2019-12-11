import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';
import {LoadingProvider} from "../../providers/loading/loading";

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  choix:string="info";
  products:any;
  product={name:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private load: LoadingProvider,
              private api:ApiProvider, public alertCtrl: AlertController, private storage: Storage) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.slides.autoplay=this.api.autoplay_val;
    this.slides.speed=this.api.slide_speed;
  }

  closeModal() {
    this.navCtrl.pop();
  }

  addCart() {
    const prompt = this.alertCtrl.create({
      title: 'Quantité',
      message: "Entrer la quantité pour ce produit.",
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          max:100,
          min:1,
          placeholder: 'Quantité'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            console.log('Saved clicked');
            let state_in=false;
            if(data.quantity>0){
              this.storage.get('commande').then((c)=>{
                // verification si le produit est déjà dans commande
                if(c==null){
                  c=[];
                  state_in=false;
                }
                else{
                  for(let i in c){
                    if(c[i].product.name==this.product.name){
                      state_in=true;
                    }
                  }
                }

                if(state_in){ // produit déjà dans la commande
                  for(let i in c){
                    if(c[i].product.name==this.product.name){
                      c[i].quantity=parseInt(c[i].quantity)+parseInt(data.quantity);
                    }
                  }
                }
                else{ // produit absent
                  c.push(
                    {
                      product:this.product,
                      quantity:data.quantity
                    });
                }

                this.storage.set('commande',c).then(r=>{
                  this.api.doToast(data.quantity+" "+ this.product.name+" ajouté(s) au panier",1000);
                  data.quantity=0;

                  this.storage.get('commande').then((d)=>{
                    console.log(d);
                    this.closeModal();
                  });
                })

              });

            }
          }
        }
      ]
    });
    prompt.present();
  }

  @ViewChild("slides") slides: Slides;
  slideChanged(){
    if(this.slides.isBeginning()){
      this.slides.startAutoplay();
    }
  }

  getProduct(id){
    this.load.show("des informations sur le produits",true);
    console.log(id);
    this.api.Products.get(id).subscribe(data=>{
      data.body.description=data.body.description.split('.');
      data.body.dosage=data.body.dosage.split('.');
      data.body.composition=data.body.composition.split('.');
      this.product=data.body;
      console.log(data);
      this.load.close();
    },d=>{
      this.load.close();
      this.api.doToast("Erreur dans le chargement des données, merci de réessayer plus tard",3000);
    });
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.init();
    setTimeout(() => {
      refresher.complete();
    }, 700);
  }

  init(){
    this.getProduct(parseInt(this.navParams.get('id')))
  }
}
