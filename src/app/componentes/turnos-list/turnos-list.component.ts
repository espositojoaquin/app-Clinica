import { Component, OnInit } from '@angular/core';
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
  constructor( private data:DataService,private auth:AuthService) { }

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
              this.listado = res.filter(res => res.paciente.dni == this.usuario.dni);
                
              })

            }
            else
            {
              if(this.usuario.rol == "profesional")
              {
                this.data.getTurnos().subscribe(tur =>{
            
                  this.usuario.especialidades.forEach(res => {
                     
                      tur.forEach(aux =>{
                        if(aux.especialidad == res)
                        this.listado.push(aux);

                      })
                    
                  });
                    
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

}
