import { AfterViewInit, Component } from '@angular/core';
import { Pagination, Autoplay } from 'swiper/modules';
import 'animate.css';
import Swiper from 'swiper';


@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss'
})
export class HeroBannerComponent implements AfterViewInit {

  public HomeSliderData = [
    {
      id: 1,
      title: "home.hero.title" ,
      subtitle: "home.hero.subtitle",
      img: "assets/img/support_assets/Banner_OfertasWEB.webp",
    },
  ];

  ngAfterViewInit() {
    new Swiper('.swiper', {
      loop: false,
      pagination: {
        el: '.tp-slider-dot',
        clickable: true,
      },
      autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: true
      },
      modules: [Pagination, Autoplay],
    });
  }
}
