import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './models/user.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }


  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

 get(uid: string): Observable<AppUser> {
  return this.db.object('/users/' + uid).snapshotChanges()
    .map( changes => changes.payload.val());
 }
}
