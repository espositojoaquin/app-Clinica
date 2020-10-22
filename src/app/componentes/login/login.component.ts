import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  emailClass:'';
  claveClass:'';
  email:string;
  clave:string;


  constructor(private auth:AuthService) { }

  usuarios: Array<any> = [
    { id: 0, nombre: "admin", correo: "admin@admin.com", clave: "1234567" },
    { id: 1, nombre: "paciente", correo: "joako.vera9@gmail.com", clave: "1234567" },
    { id: 2, nombre: "profesional", correo: "espositojoaquin1998@gmail.com", clave: "1234567" },
    { id: 3, nombre: "AdminVerif", correo: "joako-esposito@hotmail.com.ar", clave: "1234567" },
    
  ] 

  onChange(id) {
    console.log("llega");
    console.info(this.usuarios[id].correo);
    this.email = this.usuarios[id].correo;
    this.clave = this.usuarios[id].clave;
  }

  Entrar(){
    
    
    this.auth.login(this.email,this.clave).then( res=>{
      console.log("se loguea");
    
    }).catch(error =>{
      console.log("anda");
    })
     
  }
 

  ngOnInit(): void {
  }

}
