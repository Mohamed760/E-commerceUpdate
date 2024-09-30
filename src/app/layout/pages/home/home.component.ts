import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CategorysliderComponent } from "../../additions/categoryslider/categoryslider.component";
import { HomesliderComponent } from "../../additions/homeslider/homeslider.component";
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipes/onsale.pipe';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorysliderComponent, HomesliderComponent, RouterLink, UpperCasePipe,OnsalePipe, CurrencyPipe,SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  productList!:Product[];
  isLoading:boolean = false;
  userWord:string = ""
  currentPage:number = 1;
  numberOfPages:number = 0
  limit:number = 10;

  constructor(private _ProductService:ProductService , private _CartService:CartService, private toastr: ToastrService){}

  ngOnInit(): void {
    if (typeof localStorage != "undefined") {
      localStorage.setItem("currentPage", "/home")
    }

    this.getAllProduct();
  }

  getAllProduct(){
    this.isLoading = true;
    this._ProductService.getAllProduct(this.currentPage, this.limit).subscribe({
      next : (res)=>{
        console.log(res.data);
        this.productList= res.data;
        this.isLoading=false;
        this.numberOfPages = res.metadata.numberOfPages;
      },

      error : (err)=> {
        console.log(err);
        this.isLoading=false;
      }
    })
  }

  goToPage(page:number){
    if (page>= 1 && page<=this.numberOfPages) {
        this.currentPage = page;
        this.getAllProduct();
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
