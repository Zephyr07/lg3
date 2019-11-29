import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private api:ApiProvider, public alertCtrl: AlertController, private storage: Storage) {

    this.getProduct(parseInt(this.navParams.get('id')))
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
      message: "Entrer la quantité pour ce produit. Quantité Max = 20",
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          max:20,
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
            if(data.quantity>0){
              if(data.quantity<=20){
                this.storage.get('commande').then((c)=>{
                  if(c==null){
                    c=[];
                  }
                  console.log('c',c);
                  c.push(
                    {
                      product:this.product,
                      quantity:data.quantity
                    });
                  console.log(c);
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
              else{
                this.api.doToast("La quantité maximum pour ce produit est de 20", 2000);
              }

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
    console.log(id);
    this.api.Products.get(id).subscribe(data=>{
      this.product=data.body;
      console.log(data);
    });
  }
}
