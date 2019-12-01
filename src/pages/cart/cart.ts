import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {PaymentPage} from "../payment/payment";
import * as _ from 'lodash';
import {ApiProvider} from "../../providers/api/api";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  livraison:string = "";
  commande=[];
  priceTotal=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController, private storage: Storage, private api : ApiProvider,
              public alertCtrl: AlertController, private auth : AuthProvider) {

    if(this.navParams.get('state')==0){
      this.viderPanier();
    }
    else if(this.navParams.get('state')==undefined){
      console.log("Rien");
    }

    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  checkLogin(){
    this.storage.get("user").then(d=>{
      if(d==undefined || d==null){
        this.login();
      }
      else{
        this.presentActionSheet();
      }
    })
  }

  presentActionSheet() {
    if(this.livraison!=""){
      const actionSheet = this.actionSheetCtrl.create({
        title: 'Mode de paiement',
        buttons: [
          {
            text: 'Mtn Mobile Money',
            //role: 'destructive',
            handler: () => {
              console.log('Destructive clicked a');
              let profileModal = this.modalCtrl.create(PaymentPage,
                {
                  mode: 'MTN Mobile Money' ,
                  commande : this.commande,
                  price:this.priceTotal,
                  livraison:this.livraison
                });
              profileModal.present();
            }
          },{
            text: 'Orange Money',
            handler: () => {
              console.log('Archive clicked');
              let profileModal = this.modalCtrl.create(PaymentPage,
                { mode: 'Orange Money' ,
                  commande : this.commande,
                  price:this.priceTotal,
                  livraison:this.livraison
                });
              profileModal.present();
            }
          },{
            text: 'Annuler',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
    else{
      this.api.doToast('Merci de selectionner un mode de livraison',2000);
    }

  }

  choixLivraison(t){
    this.livraison=t;
    this.priceTotal=this.prix_total(this.commande);
  }

  prix_total(commande){
    let total=0;
    _.each(commande,function(c){
      total+= c.quantity* c.product.price;
    });
    if(this.livraison=='normal'){
      return total+1000;
    }
    else if(this.livraison=='express'){
      return total+2000;
    }
    else{
      return total;
    }
  }

  viderPanier(){
    this.storage.set('commande',null).then((d)=>{});
    this.commande=[];
  }


  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.init();
    setTimeout(() => {
      refresher.complete();
    }, 700);
  }

  init(){
    this.storage.get('commande').then((d)=>{
      this.commande=[];
      this.priceTotal=0;
      if(d!=undefined && d!=null){
        this.commande=d;
        this.priceTotal=this.prix_total(d);
      }
    });
  }

  removeProduct(p){
    if(p.quantity>0){
      let index= _.indexOf(this.commande,p);
      this.commande[index].quantity--;
      if(this.commande[index].quantity==0){
        this.commande.splice(index,1);
        this.checkCommande();
      }
    }
    this.priceTotal=this.prix_total(this.commande);
    this.storage.set("commande",this.commande).then(d=>{
    });
  }

  deleteProduct(p){
    let index= _.indexOf(this.commande,p);
    this.commande.splice(index,1);
    this.priceTotal=this.prix_total(this.commande);
    this.storage.set("commande",this.commande).then(d=>{
      this.api.doToast("Produit supprimé",1000);
    });
    this.checkCommande();
  }

  checkCommande(){
    if(this.commande.length<1){
      this.livraison='';
      this.priceTotal=0;
    }
  }


  login() {
    const prompt = this.alertCtrl.create({
      title: 'Connexion',
      message: "Veuillez vous connecter apour continuer",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type:'email'
        },
        {
          name: 'password',
          placeholder: 'Mot de passe',
          type:'password'
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
          text: "Créer un compte",
          handler: data => {
            console.log('Cancel clicked');
            this.register();
          }
        },
        {
          text: 'Connexion',
          handler: data => {
            console.log('Saved clicked');
            console.log(data);
            this.auth.login({email:data.email,password:data.password}).then((rep)=>{
              console.log(rep);
              // @ts-ignore
              this.storage.set('user',rep.user).then(d=>{
                this.presentActionSheet();
              })
            },d=>{
              console.log("erreur",d);
            })
          }
        }
      ]
    });
    prompt.present();
  }

  register() {
    const prompt = this.alertCtrl.create({
      title: 'Enregistrement',
      message: "Veuillez vous remplir tous les champs",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nom',
          type:'text'
        },
        {
          name: 'phone',
          placeholder: 'Téléphone',
          type:'number'
        },
        {
          name: 'gender',
          placeholder: 'Sexe : M ou F',
          type:'text'
        },
        {
          name: 'email',
          placeholder: 'Email',
          type:'email'
        },
        {
          name: 'password',
          placeholder: 'Mot de passe',
          type:'password'
        },
        {
          name: 'password_confirmation',
          placeholder: 'Confirmer mot de passe',
          type:'password'
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
          text: 'Connexion',
          handler: data => {
            console.log('Cancel clicked');
            this.login();
          }
        },
        {
          text: 'Enregistrer',
          handler: data => {
            let user={
              user_id:0,
              name:data.name,
              phone:data.phone,
              email:data.email,
              gender:data.gender,
              password:data.password,
              status:'active',
              password_confirmation:data.password_confirmation
            };
            console.log('Saved clicked');
            this.auth.register(user).then((rep)=>{
              console.log(rep);
              // creation du customer
              // @ts-ignore
              user.user_id=rep.user.id;
              // @ts-ignore
              this.storage.set('user',rep.user).then(d=>{
                this.api.Customers.post(user).subscribe(d=>{
                  console.log("Customer creer");
                  this.api.doToast("Compte créé",3000);
                  this.presentActionSheet();
                })
              });

            },d=>{
              console.log("erreur",d);
            })
          }
        }
      ]
    });
    prompt.present();
  }
}
