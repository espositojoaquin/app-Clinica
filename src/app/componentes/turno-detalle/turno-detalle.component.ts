import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Turnos } from 'src/app/models/models.module';

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.css']
})
export class TurnoDetalleComponent implements OnInit {
  @Input() turno:Turnos 
  @Output() eventoBorrarPelicula = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

    candelarTurno(id: string) {
    this.eventoBorrarPelicula.emit(id);
    this.turno = null;
    
  }

}
