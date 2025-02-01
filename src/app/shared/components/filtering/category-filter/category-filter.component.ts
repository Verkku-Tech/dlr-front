import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ICategory } from '../../../interfaces/category.interface';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent implements OnInit{
  
  route: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)
  viewScroller: ViewportScroller = inject(ViewportScroller)
  productService: ProductService = inject(ProductService)
  categoryService: CategoryService = inject(CategoryService)
  translate: TranslateService = inject(TranslateService)
  categoryData: ICategory[] = [];
  activeQuery: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.activeQuery = queryParams['category'];
      this.sortCategories(); // Sort categories when active query changes
    });

    this.categoryService.get()
    .subscribe(categories => {
      this.categoryData = categories;
      this.sortCategories(); // Sort categories after initial load
    })
  }

  private sortCategories(): void {
    if (!this.activeQuery || !this.categoryData.length) return;

    this.categoryData = [...this.categoryData].sort((a, b) => {
      const aFormatted = a.name.toLowerCase().replace('&', '').split(' ').join('-');
      if (aFormatted === this.activeQuery) return -1;
      const bFormatted = b.name.toLowerCase().replace('&', '').split(' ').join('-');
      if (bFormatted === this.activeQuery) return 1;
      return 0;
    });

    // Reset scroll position
    setTimeout(() => {
      const categoryList = document.getElementById('categoryList');
      if (categoryList) {
        categoryList.scrollTop = 0;
      }
    });
  }

  handleCategoryRoute(value: string): void {
    const newCategory = value.toLowerCase().replace('&', '').split(' ').join('-')

    // Define the query parameters as an object
    const queryParams: Params = {
      category: newCategory,
    };

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams, // Pass the queryParams object here
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products'); // Anchore Link
      });
  }

  getProductByCategory(category: string): number {
    if(this.productService.products.length === 0){
      this.productService.getProducts({})
    }

    const data = [...this.productService.products] || []
    let count = 0;
    const categoryItem = this.categoryData.find(c => c.name.toLowerCase() === category.toLowerCase());

    if (categoryItem) {

      count += data.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      ).length;

      const childCategories = this.categoryData.filter(c => c.parent.includes(categoryItem.name));
      childCategories.forEach(child => {
        count += data.filter(product =>
          product.category.toLowerCase() === child.name.toLowerCase()
        ).length;
      });
    }

    return count;
  }
}
