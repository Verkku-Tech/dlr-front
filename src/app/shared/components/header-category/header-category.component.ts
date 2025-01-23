import { Router  } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-header-category',
  templateUrl: './header-category.component.html',
  styleUrls: ['./header-category.component.scss']
})
export class HeaderCategoryComponent implements OnInit {
  
 router: Router = inject(Router)
 categoryService: CategoryService = inject(CategoryService)

 public categoryItems: ICategory[] = [];
 public isActive:boolean = false;
  
  ngOnInit(): void {
    this.categoryService.get()
    .subscribe({
      next: (categories) => {
        this.categoryItems = categories
      },
    })
  }
  

public handleActive(): void {
  this.isActive = !this.isActive;
}

  public handleParentCategory(value: string): void {
    const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
    this.router.navigate(['/search'], { queryParams: { category: newCategory } });
    this.handleActive()
  }

  public handleSubCategory(value: string): void {
    const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
    this.router.navigate(['/search'], { queryParams: { subcategory: newCategory } });
    this.handleActive()
  }
}
