import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
//import { UploadService } from './upload.service';

//import * as admin from 'firebase-admin';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';


import * as firebase from "firebase/app";
import * as admin from 'firebase-admin';


// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { Profesional, Turnos, Usuario } from '../models/models.module';
import { promise } from 'protractor';
import { rejects } from 'assert';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario:Observable<firebase.User>;
  dba = firebase.firestore();
  serviceAccount = require("../../../../app-clinicaonline-firebase-adminsdk-g2j5r-01d2be1864.json");
  
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   databaseURL: "https://app-clinicaonline.firebaseio.com"
  // });
  // ad = admin.initializeApp({
  //   credential: admin.credential.cert(this.serviceAccount),
  //   databaseURL: "https://app-clinicaonline.firebaseio.com"
  // })
  // ad = admin.initializeApp({
  //   credential: admin.credential.applicationDefault(),
  //   databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
  // });


  constructor(public router: Router,
              public angularFireAuth:AngularFireAuth,
              public storage:AngularFireStorage,
              private db: AngularFirestore,
              private toas:ToastrService,
              ) {
              this.usuario = this.angularFireAuth.authState;
            }

            getCurrentUserMail(): string {
              
              return firebase.auth().currentUser.email;
            }

            getLogueado(){
              let user = this.angularFireAuth.currentUser;
              if(user != undefined && user != null)
              { 
              //  console.info(JSON.stringify(user))
                return true;
              }
              else
              {
                return false;
              }
            }

            getUserUid()
            {  
                return new Promise((resolve, reject) => {
                  this.angularFireAuth.onAuthStateChanged(function(user){
                      if(user)
                      {
                        resolve(user.uid)
                      }
                      else
                      {
                        resolve("0")
                      }
                  })
                  
                })
          
          
            }
             
            logout() {
              this.angularFireAuth.signOut().then(() => {
                this.router.navigate(['/Login']);
              })
            }


            login(email: string, password: string) {

              return new Promise((resolve, reject) => {
                this.angularFireAuth.signInWithEmailAndPassword(email, password)
                  .then(user => {
                    if(user.user.emailVerified)
                    {
                      resolve(user);
                      this.router.navigate(['/Home']);

                    }
                    else
                    { 
                      if(user.user.email == "admin@admin.com")
                      {
                      this.router.navigate(['/Home']);

                      }
                      else
                      {
                        this.router.navigate(['/verificacion']);
                       
                        this.toas.warning("falta verificar la cuenta");

                      }
                    }
                  })
                  .catch(err => {
                    reject(err);
                    this.toas.error("Usuario Inválido","Error");
                  });
              })
            }
               
            
               subirArchivo(nombreArchivo: string, datos: any,metadata:any) {
                  return this.storage.upload(nombreArchivo, datos, {customMetadata:metadata });
                }
              
                referenciaCloudStorage(nombreArchivo: string) {
                  return this.storage.ref(nombreArchivo).getDownloadURL();
                }
  
                public uploadImg( usuario: Usuario, imagen1, imagen2){
                return new Promise((resolve,rejects) =>{
                  this.subirArchivo(usuario.email+"_img1",imagen1,{nombre:usuario.nombre,apellido:usuario.apellido}).then((img)=>{
                      this.subirArchivo(usuario.email+"_img2",imagen2,{nombre:usuario.nombre,apellido:usuario.apellido}).then(img2=>{
                       img.ref.getDownloadURL().then(data=>{
                        usuario.img1 = data;
                        console.log(data); 
                        img2.ref.getDownloadURL().then( data2=>{
                          usuario.img2 = data2;
                          resolve(data2);
                          
                         });
                       });  
                      });
                    });
                })  

                }

                async sendVerificationEmail(): Promise<void> {
                  return (await this.angularFireAuth.currentUser).sendEmailVerification();
                }

              //Registro Paciente
              async signUp(usuario: Usuario, img1, img2) {
                var router = this.router;
                var dbRef = this.db;
                var ad = this;
            
                  this.uploadImg(usuario, img1, img2).then(res =>{
                  console.log("llega");
                   this.angularFireAuth.createUserWithEmailAndPassword(usuario.email, usuario.clave)
                 .then(function(credencial) {

                   ad.router.navigate(['/verificacion']);                  
                   ad.sendVerificationEmail().then(res =>{
                    console.log("Se envio bien el mail");
                  }).catch(error =>{
                    console.log("No llega el mail");
                  });  

                   dbRef.collection('usuarios').doc(credencial.user.uid).set({
                     uid: credencial.user.uid,
                     nombre: usuario.nombre,
                     apellido: usuario.apellido,
                     email: usuario.email,
                     rol: usuario.tipo,
                     dni:usuario.dni,
                     estado:1,
                     img1: usuario.img1,
                     img2: usuario.img2
                   })
                   .then(function (docRef) {
                     
                     console.log("Bien");
                   });
                   credencial.user.getIdToken()
                     .then(function (token) {
                     localStorage.setItem('token', token);
                   });
                 })
                 .catch(function (error) {
                   console.error("Error: ", error);
                   ad.toas.error(error,"Error");
                 });
                 
                 
                })
                
              }
              
              //Registro Profesional
              async registerPro(usuario:Usuario,especialidades:Array<any>)
              {
                 
                  return new Promise((resolve, reject) => {
                    this.angularFireAuth.createUserWithEmailAndPassword(usuario.email, usuario.clave)
                      .then(res => {
                        this.sendVerificationEmail().then(res =>{
                          console.log("Se envio bien el mail");
                          this.router.navigate(['/verificacion']);   
                        }).catch(error =>{
                          console.log("No llega el mail");
                        }); 
                        this.db.collection("usuarios").doc(res.user.uid).set({
                          uid: res.user.uid,
                          nombre: usuario.nombre,
                          apellido: usuario.apellido,
                          email: usuario.email,
                          rol: usuario.tipo,
                          dni:usuario.dni,
                          estado:1, 
                          especialidades:especialidades
                          
                        })
                        resolve(res);
                      })
                      .catch(error => { reject(error) 
                      this.toas.error(error,"Error");
                        
                      });
                  });
                
              }

              //Registro Turnos

              async registerTurnos(turno:Turnos){
                return new Promise((resolve, reject) =>{
                  this.db.collection("turnos").ref.orderBy('id',"desc").limit(1).get().then(res=>{    
                    res.forEach(a=>{
                      let ida =  Number(a.id) + 1;
                      this.db.collection("turnos").doc(ida.toString()).set({
                       paciente:turno.paciente,
                       profesional: 
                        {tipo: "profesional",
                        nombre: "",
                        apellido:"indefinido",
                        id:"",
                        dni : "",
                        email : "",
                        especialidades : [],
                        estado: "pendiente"},
                       fecha:turno.fecha,
                       id:ida,
                       hora:turno.hora,
                       estado:turno.estado,
                       especialidad:turno.especialidad,
                       comentario:turno.comentario
                        
                      }).then(res=>{
                        
                        resolve(true);
    
                      }).catch(error=>{
    
                         reject(error);
                         this.toas.error(error,"Error");

    
                      })

                    })
                  }); 

                });

              }

              //Registro de Admin
              async registerAdmin(usuario:Usuario){
                
                return new Promise((resolve, reject) => {
                  this.angularFireAuth.createUserWithEmailAndPassword(usuario.email, usuario.clave)
                //  admin.auth().createUser({
                //   email: usuario.email,
                //   password: usuario.clave,
                  
                // })
                    .then(res => {
                      
                      this.sendVerificationEmail().then(res =>{
                        console.log("Se envio bien el mail");
                       // alert("Admin dado de alta con éxito");
                       this.toas.success("Admin dado de alta con éxito");
                        this.router.navigate(['/verificacion']);  
                      }).catch(error =>{
                        console.log("No llega el mail");
                      }); 
                      this.db.collection("usuarios").doc(res.user.uid).set({
                        uid: res.user.uid,
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        email: usuario.email,
                        rol: usuario.rol,
                        dni:usuario.dni,
                        estado:1
                        
                      })
                      resolve(res);
                    })
                    .catch(error => { reject(error) });
                });

              }

              updateActor(actor:Profesional)
              { 
                return  this.db.collection('usuarios').doc(actor.uid.toString()).update({
                  atencion: actor.atencion,
                  hola: "prueba"
                 
                }) 

              }


              // async registerPB(usuario:Usuario)
              // {
              //    admin.auth().createUser({
              //     email: 'user@example.com',
              //     emailVerified: false,
              //     phoneNumber: '+11234567890',
              //     password: 'secretPassword',
              //     displayName: 'John Doe',
              //     photoURL: 'http://www.example.com/12345678/photo.png',
              //     disabled: false
              //   })
              //     .then(function(userRecord) {
              //       // See the UserRecord reference doc for the contents of userRecord.
              //       console.log('Successfully created new user:', userRecord.uid);
              //     })
              //     .catch(function(error) {
              //       console.log('Error creating new user:', error);
              //     });
              // }





  
}
