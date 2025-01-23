import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() products: IProduct[] = [];
  @Input() paginate: any = {};

  @Output() setPage: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  pageSet(page: number) {
    this.setPage.emit(page); // Set Page Number
    this.scrollToTop()
  }
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
