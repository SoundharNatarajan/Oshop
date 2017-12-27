import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  create(product) {
    return this.db.list('products').push(product);
  }

  getAll(): Observable<Product[]> {
   return this.db.list<Product>('/products').snapshotChanges().map(
     changes => changes.map( c => ({key: c.payload.key, ...c.payload.val()}))
   );
  }

  get(productId): Observable<Product> {
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
