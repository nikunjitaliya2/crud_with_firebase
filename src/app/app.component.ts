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
  title = 'ang-fire';
  userData!:Observable<any>;

  constructor(private firestore: Firestore) {
    this.getData();
  }


  // insert user data
  addData(f: any) {
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, f.value)
      .then(() => {
      console.log("saved successfully");
    }).catch((err) => {
      console.log(err);
    })
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

  updateData(id: string){
    const docInstance = doc(this.firestore,'users',id);
    const updateData = {
      name : 'element'
    }
    updateDoc(docInstance,updateData)
      .then(()=> {
        console.log('data updated');
      })
      .catch((err)=>{
        console.log("err",err);
      })
  }

  deleteUser(id: string){
    const docInstance = doc(this.firestore,'users',id);
    deleteDoc(docInstance)
      .then(()=>{
        console.log('data deleted');
      })
  }
}
