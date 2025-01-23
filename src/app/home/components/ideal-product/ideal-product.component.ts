import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-ideal-product',
  templateUrl: './ideal-product.component.html',
  styleUrl: './ideal-product.component.scss'
})
export class IdealProductComponent implements OnInit, AfterViewInit {

  translate: TranslateService = inject(TranslateService);

  public data = [
    {
      id: 1,
      link: '/search',
      queryParams: { category: 'SmartPhones' },
      img: '/assets/img/Icons_SVG/Smartphone_Icon.svg',
      title: 'idealProduct.smartPhones',
      description: 'idealProduct.devices'
    },
    {
      id: 2,
      link: '/search',
      queryParams: { category: 'SmartWatches' },
      img: '/assets/img/Icons_SVG/Smartwatche_Icon.svg',
      title: 'idealProduct.smartWatches',
      description: 'idealProduct.devices'
    },
    {
      id: 3,
      link: '/search',
      queryParams: { category: 'Headphones' },
      img: '/assets/img/Icons_SVG/Audífonos_Icon.svg',
      title: 'idealProduct.headphones',
      description: 'idealProduct.devices'
    },
    {
      id: 4,
      link: '/search',
      queryParams: { category: 'Laptops' },
      img: '/assets/img/Icons_SVG/Laptop_Icon.svg',
      title: 'idealProduct.laptops',
      description: 'idealProduct.devices'
    },
    {
      id: 5,
      link: '/search',
      queryParams: { category: 'Audio' },
      img: '/assets/img/Icons_SVG/Cornetas_Icon.svg',
      title: 'idealProduct.audio',
      description: 'idealProduct.devices'
    },
    {
      id: 6,
      link: '/search',
      queryParams: { category: 'Gaming' },
      img: '/assets/img/Icons_SVG/Gaming_Icon.svg',
      title: 'idealProduct.gaming',
      description: 'idealProduct.devices'
    },
    {
      id: 7,
      link: '/search',
      queryParams: { category: 'Tablets' },
      img: '/assets/img/Icons_SVG/Tablet_Icon.svg',
      title: 'idealProduct.tablets',
      description: 'idealProduct.devices'
    },
    {
      id: 8,
      link: '/search',
      queryParams: { category: 'Connectivity' },
      img: '/assets/img/Icons_SVG/Conectividad_Icon.svg',
      title: 'idealProduct.connectivity',
      description: 'idealProduct.devices'
    },
  ];
  
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    
    new Swiper('.tp-brand-slider-active', {
      modules: [Pagination, Navigation, Autoplay],
      loop: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: true
      },
      spaceBetween: 0,
      pagination: {
        el: '.tp-brand-slider-dot',
        clickable: true,
      },
      navigation: {
        nextEl: '.tp-brand-slider-button-next',
        prevEl: '.tp-brand-slider-button-prev',
      },
      breakpoints: {
        '1200': {
          slidesPerView: 5,
        },
        '992': {
          slidesPerView: 4,
        },
        '768': {
          slidesPerView: 3,
        },
        '576': {
          slidesPerView: 2,
        },
        '0': {
          slidesPerView: 1,
        },
      },
    });


  }
}
