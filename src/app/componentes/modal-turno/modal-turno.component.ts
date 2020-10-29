import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Turnos, Usuario } from 'src/app/models/models.module';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-modal-turno',
  templateUrl: './modal-turno.component.html',
  styleUrls: ['./modal-turno.component.css']
})
export class ModalTurnoComponent implements OnInit {

  opinion:string;
  calificaciones = [1,2,3,4,5];
  calif:number;
  @Input() turno:Turnos;
  @Input() user:Usuario;
  @Input() mostrar:boolean;
  @Output() eventoMostrarModal = new EventEmitter<boolean>();

  
  constructor(private auth:AuthService,private toas:ToastrService) { }

  ngOnInit(): void {
    
    
  }
  cerrar()
  {
    this.eventoMostrarModal.emit(false);
  }
  Enviar()
  {
    
    this.auth.updateOpinion(this.turno,this.turno.opinionPaciente,this.turno.calificacionPaciente).then(res=>{
      this.toas.success("Encuesta Guardada con éxito");
      this.eventoMostrarModal.emit(false);
    }).catch(error=>{
      this.toas.error("Se produjo un error al Guardar tu encuesta","Error");
    })
  }
  
  cargarDatos()
  {
    if(this.turno.opinionPaciente != undefined && this.turno.calificacionPaciente != undefined)
    {
       this.calif = this.turno.calificacionPaciente;
       this.opinion = this.turno.opinionPaciente;
  
    }

  }


}

