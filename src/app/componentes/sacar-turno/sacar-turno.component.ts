import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Turnos, Usuario } from 'src/app/models/models.module';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.css']
})
export class SacarTurnoComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  horaFormGroup: FormGroup;
  turno:Turnos = new Turnos();
  profesionales:any;
  today = new Date();
  horas:Array<any> = [];
  usuario:any = new Usuario();
  hora:any;
   

  constructor(private _formBuilder: FormBuilder,private data:DataService,private toastr:ToastrService,private auth:AuthService) {}

  ngOnInit() {

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
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.horaFormGroup = this._formBuilder.group({
      horaCtrl: ['', Validators.required],
      fechaCtrl:['', Validators.required]
    });
  
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    let valid:boolean;

    this.turno.profesional.atencion.forEach(res =>{
       if(this.transformFech(res.dia) == day)
       {
          valid = true;

       }
    })
    // Prevent Saturday and Sunday from being selected.

    return valid && day !== 0;
  }

  Entrar(){  
    
    this.turno.paciente = this.usuario;
  
     console.log(this.turno.fecha);
     console.info(this.turno);

      this.auth.registerTurnos(this.turno).then(res=>{
        console.log("Guarda bien el turno");
        this.toastr.success("Turno Guardado con Éxito");
      }).catch(error =>{
        console.log("Pincho el turno pa");
        console.info(error);
      })

    
     
  }
   
  get nombre() {​​ return this.firstFormGroup.get('firstCtrl'); }
  
  
  tomarEspecialidad(dato:any)
  { 
    const {​​ nombre }​​ = this.firstFormGroup.value;
    // nombre = dato.nombre 
     this.turno.especialidad = dato.nombre;
  }
  tomarProfesional(dato:any)
  {
    this.turno.profesional = dato;
    
  }
  parserFecha(fecha:Date)
  {
    let dia = fecha.getDate;
    let mes = fecha.getMonth;
    let anio = fecha.getFullYear;
    let feche = dia + "-" + mes + "-" + anio;
    
    return feche;
   
  }

  cargarProfesionales(dato:string)
  { 

    this.data.getProfesionales(dato).then(res =>{
        
  
      if(res.length > 0)
      { 
        
      this.profesionales = res; 
  
      }

      console.log(res);
     
   })
    
  }

  transformFech(fecha:string)
  {  
    let dia;
    switch(fecha)
    {
        case "Lunes":
           dia = 1;
        break;
        case "Martes":
         dia = 2; 
        break;

        case "Miércoles":
          dia = 3; 
        break;

        case "Jueves":
          dia = 5; 
        break;

        case "Viernes":
          dia = 5; 
        break;

        case "Sábado":
          dia = 6; 
        break;
    } 

    return dia;

  }

 

  cargarHora()
  {
    
    this.horas = [];
    
    let date = new Date(this.turno.fecha);
    let dia="";
    let dias=[];
    console.info();
    switch(date.getDay())
    {
      case 1:
        dia = "Lunes";
        break;
      case 2:
         dia = "Martes";
        break;
      case 3:
        dia = "Miércoles";

        break;
      case 4:
        dia = "Jueves";
        
        break;
      case 5:
        dia = "Viernes";

        break;
      case 6:
        dia = "Sábado";
        
        break;
      case 6:
        dia = "Domingo";

        break;
    }
   // this.horas = this.turno.profesional.atencion.map(function(x){return x.hora});
   console.log(dia);
    dias = this.turno.profesional.atencion.filter(function(x){return x.dia == dia})
    if(dias.length>0)
    {
       this.horas = dias.map(function(x){return x.hora});
       console.info(this.horas);
    }
    else
    {
      this.toastr.warning("El profesional no atiende el dia de la semana indicado");
    }
  }
     
  
}
