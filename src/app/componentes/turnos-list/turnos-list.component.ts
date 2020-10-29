import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Turnos, Usuario } from 'src/app/models/models.module';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-turnos-list',
  templateUrl: './turnos-list.component.html',
  styleUrls: ['./turnos-list.component.css']
})
export class TurnosListComponent implements OnInit {
   
  listado:Array<Turnos> = new Array<Turnos> ();
  usuario:any = new Usuario();
  filtro = ['Profesional','Especialidad','Dia'];
  dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  fitroSeleccionado:string;
  escribir:string;
  dia:string;
  turnoSeleccionado:Turnos;
  mostrarModal:boolean;
  cancelarPro:boolean;
  rechazarPro:boolean;
  constructor( private data:DataService,private auth:AuthService,private toast:ToastrService) { }

  ngOnInit(): void {

    var uid="0";
     this.auth.getUserUid().then(res =>{
       uid = res.toString();
       this.data.getUserByUid(uid)
          .subscribe(res => {
            this.usuario = res;
            if(this.usuario.rol == "paciente")
            {
              this.data.getTurnos().subscribe(res =>{
            
              console.info(this.usuario.dni);
              this.listado = res.filter(res => res.paciente.dni == this.usuario.dni && res.estado != -1);
                
              })

            }
            else
            {
              if(this.usuario.rol == "profesional")
              {
                this.data.getTurnos().subscribe(tur =>{

                  this.listado = tur.filter(res => res.profesional.dni == this.usuario.dni);
            
                    
                  })
              }
              else
              {
                this.data.getTurnos().subscribe(res =>{
        
                  this.listado = res
                    
                  })
              }
            }
            
          })
     }).catch(res =>{
      uid = res.toString();
      console.log("Sin Usuario");
     });



  } 
  mostrarEncuesta(dato:boolean)
  {
    this.mostrarModal = dato;
  }
  tomarTurno(turno:Turnos)
  {
     this.turnoSeleccionado = turno;
    
  }

  cancelar(turno:Turnos)
  {   
     if(this.usuario.rol == "paciente")
     {
       this.auth.updateEstadoTurno(turno,-1).then(res=>{
         this.toast.success("Turno Cancelado con éxito");
       }).catch(error=>{
         this.toast.error("Hemos tenido un problema la cancelar el turno","Error");
       })

     }
     else
     {
       
       if(this.usuario.rol = "profesional")
       { 
         this.cancelarPro = true;
         this.mostrarEncuesta(true);
       }
     }
  }
  rechazar(turno:Turnos)
  {
        this.rechazarPro = true;
         this.mostrarEncuesta(true);
  }
  aceptar(turno:Turnos)
  {
    this.auth.updateEstadoTurno(turno,1).then(res=>{
      this.toast.success("Turno Aceptado con éxito");
    }).catch(error=>{
      this.toast.error("Hemos tenido un problema la cancelar el turno","Error");
    })
  }

  justificacion(value:boolean)
  {
    this.rechazarPro = value;
    this.cancelarPro = value;
  }

}
