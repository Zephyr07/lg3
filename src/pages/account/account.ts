import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {InfoPage} from "../info/info";
import {CommandListPage} from "../command-list/command-list";
import {PartnerPage} from "../partner/partner";
import {AuthProvider} from "../../providers/auth/auth";
import {Storage} from "@ionic/storage";
import {ApiProvider} from "../../providers/api/api";
import {ShopListPage} from "../shop-list/shop-list";

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
  command=CommandListPage;
  partner=PartnerPage;
  state_log=false;
  shop=ShopListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
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
      console.log("d",d);
      if(d==undefined || d==null){
        if(t!=""){
          this.login(t);
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

  login(t) {
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
          text: "Créer un compte",
          handler: data => {
            console.log('Cancel clicked');
            this.register(t);
          }
        },
        {
          text: 'Connexion',
          handler: data => {
            console.log('Saved clicked');
            console.log(data);
            this.auth.login({email:data.email,password:data.password}).then((rep)=>{
              console.log(rep);
              this.state_log=true;
              // @ts-ignore
              this.storage.set('user',rep.user).then(d=>{
                // @ts-ignore
                this.navCtrl.push(t,{user_id:rep.user.id})
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

  register(t) {
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
          type:'number',
          min:200000000
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
          text: 'Connexion',
          handler: data => {
            console.log('Cancel clicked');
            this.login(t);
          }
        },
        {
          text: 'Enregistrer',
          handler: data => {
            let user={
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
              this.state_log=true;
              // @ts-ignore
              user.user_id=rep.user.id;
              // @ts-ignore
              this.storage.set('user',rep.user).then(d=>{
                this.api.Customers.post(user).subscribe(d=>{
                  console.log("Customer creer");
                  this.api.doToast("Compte créé",3000);
                  // @ts-ignore
                  this.navCtrl.push(t,{user_id:rep.user.id})
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

