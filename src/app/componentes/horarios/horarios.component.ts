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
  ngOnInit(): void {
    this.setHorarios(8,20);

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

  atencion()
  { 
    let aux:Array<any> = new Array();
    let nuev:Array<any> = new Array();
    aux.push(this.profesional.atencion);
    aux.forEach(item =>{
      nuev.push(item[0]);
    })
    nuev.push({dia:this.dia,hora:this.hora});
    this.profesional.atencion = nuev;
    console.info(this.profesional.atencion);

    console.info(this.profesional);

    this.auth.updateActor(this.profesional).then(res =>{
       this.toast.success("Día y horario guardado con éxito");
    }).catch(error =>{
      this.toast.error(error,"Error");
    });

    
 
  }

}
