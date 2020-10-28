import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from "../environments/environment";

//Material Components 
import { MaterialComponent } from './componentes/material/material.component';

//Alertas
import { ToastrModule } from 'ngx-toastr';

//Componentes 
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { VerificacionCuentaComponent } from './componentes/verificacion-cuenta/verificacion-cuenta.component';
import { HomeComponent } from './componentes/home/home.component';
import { SolicitarTurnoComponent } from './componentes/solicitar-turno/solicitar-turno.component';
import { TurnosListComponent } from './componentes/turnos-list/turnos-list.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { VerificacionProfesionalComponent } from './componentes/verificacion-profesional/verificacion-profesional.component';
import { HorariosComponent } from './componentes/horarios/horarios.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EstadoTurnoPipe } from './pipes/estado-turno.pipe';
import { TurnoDetalleComponent } from './componentes/turno-detalle/turno-detalle.component';
import { FiltroPipe } from './pipes/filtro.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    VerificacionCuentaComponent,
    HomeComponent,
    SolicitarTurnoComponent,
    TurnosListComponent,
    AltaAdminComponent,
    VerificacionProfesionalComponent,
    HorariosComponent,
    EstadoTurnoPipe,
    TurnoDetalleComponent,
    FiltroPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MaterialComponent,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule

  ],
  providers: [
   {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
