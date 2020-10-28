import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoTurno'
})
export class EstadoTurnoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    let retorno;
    //if(!value) retorno ='';
  
      if(value == 0)
      {
        retorno = "Pendiente";
      }
      else
      {
        if(value == -1)
        {
          retorno = "Cancelado";
        }
        else
        {
          if(value == 1)
          {
            retorno = "Aceptado";
          }
          else
          {
            if(value == 3)
            {
              retorno = "Rechazado";
            }
            else
            {
              if(value == 4)
              {
                retorno = "En Atención";
              }
              else
              {
                retorno = "Finalizado";
              }
            }
          }
        }
      }

    
    return retorno;
  }

}
