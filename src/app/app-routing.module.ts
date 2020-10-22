import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { SolicitarTurnoComponent } from './componentes/solicitar-turno/solicitar-turno.component';
import { TurnosListComponent } from './componentes/turnos-list/turnos-list.component';
import { VerificacionCuentaComponent } from './componentes/verificacion-cuenta/verificacion-cuenta.component';
import { VerificacionProfesionalComponent } from './componentes/verificacion-profesional/verificacion-profesional.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'Login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'verificacion',component:VerificacionCuentaComponent,canActivate:[AuthGuard]},
  {path:'Home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'solicitarTurno',component:SolicitarTurnoComponent,canActivate:[AuthGuard]},
  {path:'listadoTurnos',component:TurnosListComponent,canActivate:[AuthGuard]},
  {path:'altaAdmin',component:AltaAdminComponent,canActivate:[AuthGuard]},
  {path:'verificacionProfesional',component:VerificacionProfesionalComponent,canActivate:[AuthGuard]}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
