import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/cart/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {

  productList:WritableSignal<Product[]> = signal<Product[]>([])
  currentPage:number = 1 //page
  numberOfPages:number = 0;
  limit = 10;

  constructor(private _ProductService:ProductService,private _CartService:CartService, private toastr: ToastrService){}

  ngOnInit(): void {

    this.getAllProduct()

    if (typeof localStorage != "undefined") {
      localStorage.setItem("currentPage", "/products")
    }
  }

  getAllProduct(){
    this._ProductService.getAllProduct(this.currentPage, this.limit).subscribe({
      next : (res)=> {
        console.log(res.data);
        this.productList.set(res.data);
        this.numberOfPages = res.metadata.numberOfPages;
      }
    })
  }

  goToPage(page:number){
    if (page>= 1 && page<= this.numberOfPages) {
      this.currentPage = page;
      this.getAllProduct()
    }
  }

  addProductToCart(productId:string){
    this._CartService.addProductToCart(productId).subscribe({
      next : (res)=> {
        console.log(res);
        this.toastr.success(res.message, "", {
          progressBar: true,
          positionClass : 'toast-top-right'
        });
      },

      error: (err)=> {
        console.log(err);
        
      }
    })
  }

}
