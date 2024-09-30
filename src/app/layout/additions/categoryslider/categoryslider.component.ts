import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Categroy } from '../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categoryslider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categoryslider.component.html',
  styleUrl: './categoryslider.component.scss'
})
export class CategorysliderComponent implements OnInit {
  isLoading:boolean = false;
  categoryList!:Categroy[]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      },
      
    },
    nav: true
  }

  constructor(private _CategoryService:CategoryService){}

  ngOnInit(): void {
    this.getAllCategories();
  }
  
  getAllCategories(){
    this.isLoading= true;
    this._CategoryService.getAllCategroy().subscribe({
      next: (res)=> {
        this.categoryList = res.data;
        console.log(this.categoryList);
        this.isLoading =false;
      },

      error: (err)=> {
        console.log(err);
        this.isLoading =false;
      }
    })
  }
}
