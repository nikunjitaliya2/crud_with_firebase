import {Component} from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc
} from "@angular/fire/firestore";

import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  display = "none";
  title = 'ang-fire';
  userData!:Observable<any>;

  constructor(private firestore: Firestore) {
    this.getData();
  }

  vForm ={
    uname : '',
    uemail: '',
    age: '',
    mobile: '',
    upassword: ''
  }

  regerInteger = /^\d+$/

  // insert user data
  addData(f: any) {
    if (f.valid) {
      const collectionInstance = collection(this.firestore, 'users');
      addDoc(collectionInstance, f.value)
        .then(() => {
          console.log("saved successfully");
        }).catch((err) => {
        console.log(err);
      })
    }
  }

  // read user data
  getData(){
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance,{idField : 'id'})
      .subscribe(res => {
      // console.log(res);
    })
    this.userData = collectionData(collectionInstance , {idField : 'id'})
  }

  updatedName: string = '';
  updatedEmail: string = '';

  // test update details


  // work done updatData()
  updateData(id: string){
    const docInstance = doc(this.firestore,'users',id);
    const updateData = {
      name : this.updatedName ,// pass the updated name value here
      email : this.updatedEmail // pass the updated email value here
    }
    updateDoc(docInstance,updateData)
      .then(()=> {
        console.log('updated successfully');
      })
      .catch((err)=>{
        console.log("err",err);
      })
    this.updatedName= ''
  }


  // delete user
  deleteUser(id: string){
    const docInstance = doc(this.firestore,'users',id);
    deleteDoc(docInstance)
      .then(()=>{
        console.log('delete successfully');
      })
  }
  // check working of model
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

}
