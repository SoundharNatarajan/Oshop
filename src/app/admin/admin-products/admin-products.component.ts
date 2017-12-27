import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  products: Product[];
  filteredProducts: Product[];

  subscription: Subscription;

  constructor(private productService: ProductService) { 
     this.subscription = this.productService.getAll().subscribe( products => this.filteredProducts = this.products = products);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query)?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.filteredProducts = this.products;
  }

}
