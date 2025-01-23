import { Component, AfterViewInit, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit{
  
  spinnerService = inject(NgxSpinnerService)

  constructor(){
    this.spinnerService.show()
  }

  ngAfterViewInit(): void {
    this.spinnerService.hide()
  }

}
