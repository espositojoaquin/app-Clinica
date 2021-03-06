import { Component, OnInit} from '@angular/core';
import { timeStamp } from 'console';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { Profesional } from 'src/app/models/models.module';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  constructor(private auth:AuthService,private data:DataService,private toast:ToastrService) { }

  dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  horarios = [];
  dia:any;
  hora:any;
  profesional:any = new Profesional();
  displayedColumns: string[] = ['Nombre', 'Día', 'Hora','Acción'];
  ngOnInit(): void {
  
    var uid="0";
    this.auth.getUserUid().then(res =>{
      uid = res.toString();
      this.data.getUserByUid(uid)
         .subscribe(res => {
           this.profesional = res;
         })
    }).catch(res =>{
     uid = res.toString();
     console.log("Sin Usuario");
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 ;
  }
  setHorarios(inicio:number,final:number)
  {
     this.horarios = [];
     for (let index = inicio; index < final; index++) {
       
       let time = index + ":" + "00";
       this.horarios.push(time);
    } 

    console.info(this.horarios);

  }

  sabado()
  {
    if(this.dia == "Sábado")
    {
      this.setHorarios(8,15);
    }
    else
    {
      this.setHorarios(8,20);

    }
  }

  atencion()
  { 
    let aux:Array<any> = new Array();
    let nuev:Array<any> = new Array();
    aux.push(this.profesional.atencion);
    aux.forEach(item =>{
      nuev.push(item);
    })
    nuev[0].push({dia:this.dia,hora:this.hora});
    
     this.profesional.atencion = nuev[0];


    this.auth.updateHorario(this.profesional).then(res =>{
       this.toast.success("Día y horario guardado con éxito");
    }).catch(error =>{
      this.toast.error(error,"Error");
    });

    
  }

  eliminar(item)
  { 
   // console.log(item);
     let aux:Array<any> = new Array();
     let nuev:Array<any> = new Array();

     aux.push(this.profesional.atencion);
    
     aux[0].splice(aux[0].indexOf(item),1);
     
     this.profesional.atencion = aux[0];
     this.auth.updateHorario(this.profesional).then(res =>{
      this.toast.success("Registro Eliminado con éxito");
   }).catch(error =>{
     this.toast.error(error,"Error");
   });


    
  }

}
