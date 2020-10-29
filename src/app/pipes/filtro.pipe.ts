import { UpperCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Turnos } from '../models/models.module';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: Turnos[], arg: string,arg2:string): unknown {
         
    console.log(arg);
    console.log(arg2);
    console.info(value);
         const result = [];
        value.forEach(item =>{
              if(arg == "Profesional")
              {   
                
                     if(item.profesional.apellido.toLowerCase().indexOf(arg2.toLowerCase()) > -1)
                     {
                       result.push(item);
                     }
              }
              else{
                if(arg == "Especialidad"){
                  if(item.especialidad.toLowerCase().indexOf(arg2.toLowerCase()) > -1)
                  {
                    result.push(item);
                  }
                }
                else
                {
                  if(arg == "Dia")
                  {
                    switch(arg2)
                    {
                      case "Lunes":
                        if(new Date(item.fecha).getDay() == 0)
                        {
                          result.push(item);
                        }
                        break;
                        case "Martes":
                          if(new Date(item.fecha).getDay() == 1)
                          {
                            result.push(item);
                          }
                        break;

                        case "Miércoles":
                          if(new Date(item.fecha).getDay() == 2)
                          {
                            result.push(item);
                          }
                        break;

                        case "Jueves":
                          if(new Date(item.fecha).getDay() == 3)
                          {
                            result.push(item);
                          }
                        break;

                        case "Viernes":
                          if(new Date(item.fecha).getDay() == 4)
                          {
                            result.push(item);
                          }
                        break;

                        case "Sábado":
                          if(new Date(item.fecha).getDay() == 5)
                          {
                            result.push(item);
                          }
                        break;
                    }
                  }
                }
                
              }
             

        })
     
   
   if(result.length >0 )
   {
     return result;

   }
   else
   {
     return value;
   }
  }

}
