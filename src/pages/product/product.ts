import {Component, ViewChild} from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, Slides} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {LoadingProvider} from "../../providers/loading/loading";
import {ProductQuantityPage} from "../product-quantity/product-quantity";

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
  product={name:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private load: LoadingProvider,
              private api:ApiProvider,public modalCtrl: ModalController) {
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


  presentProfileModal() {
    let profileModal = this.modalCtrl.create(ProductQuantityPage, { product: this.product });
    profileModal.present();
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
