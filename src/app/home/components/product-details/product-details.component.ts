import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/product/products.service';
import { Product } from '../../types/products.type';
import { Subscription } from 'rxjs';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeItem';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  subscriptions: Subscription = new Subscription();
  faShoppingCart = faShoppingCart;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private cart: CartStoreItem
  ) {}
  
  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.productService.getProduct(id).subscribe(product => {
        this.product = product[0];
      })
    );
  }
  
  addToCart() {
    this.cart.addProduct(this.product);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    
  }
}
