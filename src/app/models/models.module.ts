import { NgModule } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { StringifyOptions } from 'querystring';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ModelsModule { }


export class Usuario{

  id:string;
  tipo:string;
  nombre:string;
  apellido:string;
  email:string;
  dni:string;
  clave:string;
  estado:number;
  img1:string;
  img2:string;
  rol:string;

}
export class Profesional{

 id:string;
  tipo:string;
 nombre:string;
  apellido:string;
  email:string;
  dni:string;
  estado:string;
  especialidades:Array<any>;

  constructor(){
    this.tipo = "profesional";
     this.nombre = "a";
    this.apellido = "a";
    this.id = "a";
    this.dni = "a";
    this.email = "a";
    this.especialidades = [];
    this.estado = "pendiente";
  }

}

export class Turnos{

 paciente:Usuario;
 profesional:Profesional = new Profesional();
 fecha:Date;
 hora:Time;
 estado:number;
 comentario:string;
 especialidad:string;

 constructor(){
   //this.profesional.tipo = "profesional";
    this.estado=1;
    this.comentario = "-";
    

 }
}