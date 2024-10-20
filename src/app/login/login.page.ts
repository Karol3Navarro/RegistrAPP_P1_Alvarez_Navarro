import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PresenteprofeService } from '../services/presenteprofe.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public username: string;
  public password: string;

  constructor(private navCtrl: NavController, private router: Router, private presenteprofe : PresenteprofeService) { 
    this.username = '';
    this.password = '';
  }

  onLogin(){
    this.presenteprofe.login(this.username, this.password).subscribe(
      (response)=>{
        console.log(response);
        if (response.data.perfil == "docente"){
          this.navCtrl.navigateForward(['/docente'], {queryParams: {nombre: response.data.nombre}})
        }if(response.data.perfil == "estudiante"){
          this.navCtrl.navigateForward(['/alumno'], {queryParams: {nombre: response.data.nombre}})
        }
      }
    )
  }
  openUrl(url:string){
    window.open(url, '_balck');
  }
  ngOnInit() {
  }

}
