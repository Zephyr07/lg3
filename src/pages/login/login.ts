import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {ApiProvider} from "../../providers/api/api";
import {LoadingProvider} from "../../providers/loading/loading";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  choix:string="login";
  data:any={};
  rdata:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams, private api : ApiProvider,
              private load : LoadingProvider, private auth : AuthProvider, private storage : Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

  login(){
    console.log(this.data);
    if(this.data.email!="" && this.data.email!=undefined && this.data.password!="" && this.data.password!=undefined){
      this.load.show("Connexion ...",false);
      this.auth.login({email:this.data.email,password:this.data.password}).then((rep)=>{
        console.log(rep);
        // @ts-ignore
        this.storage.set('user',rep.user).then(d=>{
          this.api.doToast("Vous êtes connecté",3000);
          this.load.close();
          this.closeModal();
        },d=>{
          this.load.close();
          this.api.doToast("Une erreur est survenue. Merci d'actualiser",3000);
        })
      },d=>{
        this.load.close();
        console.log("erreur",d);
        if(d.status==401){
          this.api.doToast("Email ou mot de passe incorrect",3000);
        }
        else if(d.status==403){
          this.api.doToast("Compte inexistant",3000);
        }
        else{
          this.api.doToast("Une erreur est survenue",3000);
        }
      })
    }
    else{
      this.api.doToast("Merci de remplir tous les champs",2000);
    }
  }

  register(data){
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
    if(data.name=="" || data.email=="" || data.phone=="" || data.password=="" || data.password_confirmation=="" || data.gender==""){
      this.load.close();
      this.api.doToast("Merci de remplir tous les champs",3000);
    }
    else{
      this.load.close();
      if(user.password==user.password_confirmation){
        this.load.show("Enregistrement des données",false);
        this.auth.register(user).then((rep)=>{
          console.log(rep);
          // creation du customer
          // @ts-ignore
          user.user_id=rep.user.id;
          // @ts-ignore
          this.storage.set('user',rep.user).then(d=>{
            this.api.Customers.post(user).subscribe(d=>{
              console.log("Customer creer");
              this.load.close();
              this.api.doToast("Compte créé",3000);
              this.closeModal();
            }, d=>{
              this.load.close();
              this.api.doToast("Erreur dans l'enregistrement du client, contactez l'administrateur",5000);
            })
          });

        },d=>{
          console.log("erreur",d);
          if(d.status==422){
            this.api.doToast("Les données renseignées ne sont pas conformes",3000);
          }
        })
      }
      else{
        this.load.close();
        this.api.doToast("Les mots de passe ne correspondent pas",3000);
      }
    }
  }
}
