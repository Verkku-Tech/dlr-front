import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() full_width: boolean = false;
  @Input() shop_1600: boolean = false;
  @Input() top_spacing: string = "";
  @Input() bot_spacing: string = "";
}
