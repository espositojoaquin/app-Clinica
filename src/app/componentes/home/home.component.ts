import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/models.module';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   
  usuario:any = new Usuario();
  constructor(private route:Router,private data:DataService,private auth:AuthService) { }

  ngOnInit(): void { 

    var uid="0";
     this.auth.getUserUid().then(res =>{
       uid = res.toString();
       this.data.getUserByUid(uid)
          .subscribe(res => {
            this.usuario = res;
           
          })
     }).catch(res =>{
      uid = res.toString();
      console.log("Sin Usuario");
     });

  }

  solicitarTurno(){
    this.route.navigate(['/solicitarTurno']); 
  }
  altaAdmin(){
    this.route.navigate(['/altaAdmin']); 
  }
  turnos(){
    this.route.navigate(['/listadoTurnos']); 

  }
  horarios(){
    ///horarios
    this.route.navigate(['/horarios']); 

  }
 
  logOut()
  {
    this.auth.logout();

  }

}
