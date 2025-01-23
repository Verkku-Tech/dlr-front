import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-tab',
  templateUrl: './orders-tab.component.html',
  styleUrl: './orders-tab.component.scss'
})
export class OrdersTabComponent {
  orders = [
    {
      id: 2245,
      products: [
        {
          name: 'Iphone XS'
        },
        {
          name: 'Iphone 10'
        },
        {
          name: 'Iphone 12'
        },
        {
          name: 'Iphone 14 Pro'
        },
        {
          name: 'Iphone 15 Pro Max'
        },
        {
          name: 'Laptop Gaming MSI Modern 15'
        }],
      status: 'En espera'
    },
    {
      id: 2244,
      products: [
        {
          name: 'Iphone 10'
        },
        {
          name: 'Audífonos MSI kirito edition'
        }],
      status: 'Completada'
    },
    {
      id: 2243,
      products: [
        {
          name: 'Mouse Gaming Re-Dragon'
        }],
      status: 'Cancelada'
    },
  ]

}
