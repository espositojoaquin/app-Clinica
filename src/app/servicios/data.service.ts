import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  dbEspecialidadRef: AngularFirestoreCollection<any>;
  dbUsersRef:AngularFirestoreCollection<any>;
  dbTurnosRef:AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.dbEspecialidadRef = this.db.collection("especialidades");
    this.dbUsersRef = this.db.collection("usuarios");
    this.dbTurnosRef = this.db.collection("turnos");

   }


   getEspecialidades() {
    return this.dbEspecialidadRef.valueChanges();
  }

  getTurnos(){
    return this.dbTurnosRef.valueChanges();
  }

  getUserByUid(uid: string) {
    return this.dbUsersRef.doc(uid).valueChanges();
  }




}
