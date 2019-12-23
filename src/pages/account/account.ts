import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {InfoPage} from "../info/info";
import {CommandListPage} from "../command-list/command-list";
import {PartnerPage} from "../partner/partner";
import {AuthProvider} from "../../providers/auth/auth";
import {Storage} from "@ionic/storage";
import {ApiProvider} from "../../providers/api/api";
import {ShopListPage} from "../shop-list/shop-list";
import {PolitiquePage} from "../politique/politique";
import {ConditionsPage} from "../conditions/conditions";
import {LoadingProvider} from "../../providers/loading/loading";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
              private auth : AuthProvider, private storage: Storage, private api : ApiProvider, private load : LoadingProvider) {

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
            this.register(t);
          }
        },
        {
          text: 'Connexion',
          handler: data => {
            this.load.show("Connexion",false);
            if(data.email!="" && data.password!=""){
              this.auth.login({email:data.email,password:data.password}).then((rep)=>{
                this.load.close();
                this.state_log=true;
                // @ts-ignore
                this.storage.set('user',rep.user).then(d=>{
                  // @ts-ignore
                  this.navCtrl.push(t,{user_id:rep.user.id})
                })
              },d=>{
                this.load.close();
                console.log("erreur",d);
                if(d.status==401){
                  this.api.doToast("Email ou mot de passe incorrect",3000);
                }
                else if(d.status==403){
                  this.api.doToast("Compte innexistant",3000);
                }
                else{
                  this.api.doToast("Une erreur est survenue",3000);
                }
              })
            }
            else{
              this.api.doToast("Merci de renseigner tous les champs",3000);
            }
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
          name: 'email',
          placeholder: 'Email',
          type:'email'
        },
        {
          name: 'password',
          placeholder: 'Mot de passe (6 caractères)',
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
            this.login(t);
          }
        },
        {
          text: 'Enregistrer',
          handler: data => {
            this.load.show("Verification des données",false);
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
            if(data.name=="" || data.email=="" || data.phone=="" || data.password=="" || data.password_confirmation==""){
              this.load.close();
              this.api.doToast("Merci de remplir tous les champs",3000);
            }
            else{
              this.load.close();
              this.load.show("Enregistrement des données",false);
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
                    this.load.close();
                    this.api.doToast("Compte créé",3000);
                    // @ts-ignore
                    this.navCtrl.push(t,{user_id:rep.user.id})
                  }, d=>{
                    this.load.close();
                    this.api.doToast("Erreur dans l'enregistrement du client, contactez l'administrateur",5000);
                  })
                });

              },d=>{
                this.load.close();
                console.log("erreur",d);
                if(d.status==422){
                  this.api.doToast("Les données renseignées ne sont pas conformes",3000);
                }
              })
            }
          }
        }
      ]
    });
    prompt.present();
  }
}

