import { Component, ElementRef, OnInit, TemplateRef, ViewChild, inject, model } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {
  @ViewChild('productModal') productModal!: ElementRef;
  private modalService = inject(NgbModal);
  public utilsService = inject(UtilsService);

  ngOnInit(): void {
    this.utilsService.popupProductObserver.subscribe((isVisible) => {
      if (isVisible) {
        this.open()
      }
    })
  }

  open() {
    this.modalService.open(this.productModal, { centered: true });
  }
  close() {
    this.utilsService.closeQuickView()
    this.modalService.dismissAll()
  }
}
