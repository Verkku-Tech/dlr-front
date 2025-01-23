import { Component, inject } from '@angular/core';
import { IMenuItem } from '../../interfaces/menu.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-menu-secondary',
  templateUrl: './top-menu-secondary.component.html',
  styleUrl: './top-menu-secondary.component.scss'
})
export class TopMenuSecondaryComponent {

  translate = inject(TranslateService)

  public menu_data: IMenuItem[] = [
    {
      id: 'smartphones',
      link: '/search',
      title: 'menu.MobileDevices'
    },
    {
      id: 'audio',
      link: '/search',
      title: 'menu.Audio'
    },
    {
      id: 'laptops',
      link: '/search',
      title: 'menu.Laptops'
    },
    {
      id: 'gaming',
      link: '/search',
      title: 'menu.Gaming'
    },
    {
      id: 'connectivity',
      link: '/search',
      title: 'menu.Connectivity'
    }
  ]
}
