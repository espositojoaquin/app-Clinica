import { Component, OnInit } from '@angular/core';
import { info } from 'console';
import { database } from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Turnos, Usuario } from 'src/app/models/models.module';
import { DataService } from 'src/app/servicios/data.service';
import { AuthService } from "../../servicios/auth.service";

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {

  
  usuario:any = new Usuario();

  especialidades:Array<any> = new Array<any>();
  lista:Array<any>;
  turno:Turnos = new Turnos();

  constructor(private auth:AuthService, private data:DataService, private toastr:ToastrService ) { }
 

  Entrar(){
    
    this.turno.paciente = this.usuario;
     
    if(this.validacion())
    {
      console.info(this.turno);
      this.auth.registerTurnos(this.turno).then(res=>{
        console.log("Guarda bien el turno");
        this.toastr.success("Turno Guardado con Éxito");
      }).catch(error =>{
        console.log("Pincho el turno pa");
        console.info(error);
      })

    }
     
  }

  cargarEspecialidades(){

    this.lista = (this.especialidades.filter(res => res.completed == true )).map(res => res.name);
    console.info(this.lista);
  }

  ngOnInit(): void {

      this.data.getEspecialidades().subscribe( res =>{
            res.forEach(item =>{
              
              let objet = {name: item.nombre, completed: false, color: 'primary'} 

              this.especialidades.push(objet);
                
            })

            console.info(this.especialidades);
      }) 
      var uid="0";
     this.auth.getUserUid().then(res =>{
       uid = res.toString();
       this.data.getUserByUid(uid)
          .subscribe(res => {
            this.usuario = res;
            console.info(this.usuario);
          })
     }).catch(res =>{
      uid = res.toString();
      console.log("Sin Usuario");
     });

  }
  validacion()
  {  
    if(this.turno.paciente.nombre != null && this.turno.paciente.apellido !=null && this.turno.paciente.email !=null && this.turno.paciente.dni !=null && this.turno.hora !=null && this.turno.fecha !=null && this.turno.especialidad !=null)
    {
       return true;
    }
    else
    { 
      this.toastr.error("Datos incompletos o inválidos", "ERROR");
      return false;
    }
  
  }




   
 

  


}
