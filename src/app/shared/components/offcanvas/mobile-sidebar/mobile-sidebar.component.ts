import { Component, Input, inject } from "@angular/core";
import { IMobileType } from "../../../interfaces/menu.interface";
import { UtilsService } from "../../../services/utils.service";
import { ICategory } from "../../../interfaces/category.interface";
import { AuthService } from "../../../../auth/services/auth.service";
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss']
})
export class MobileSidebarComponent {
  @Input () product_type!:string;

  translate: TranslateService = inject(TranslateService)
  authService: AuthService = inject(AuthService)

  public mobile_menu: IMobileType[] = [
    {
      id: 1,
      link: '/search?sortBy=low&page=1',
      title: 'menu.SpecialOfferts'
    },
    {
      id: 2,
      link: '/about-dlr',
      title: 'menu.AboutDLR'
    },
    {
      id: 3,
      link: '/faq',
      title: 'menu.FAQ'
    },
    {
      id: 4,
      link: '/contact',
      title: 'menu.Contact'
    },
  ]
  //TODO# Add the categories from db
 public categoryItems: ICategory[] = []

  public isCategoryActive:boolean = false;
  public openCategory:string = '';
  public isActiveMenu:string = '';
  public isToggleActive:string = '';

  constructor(public utilsService:UtilsService) {}

  toggleCategoryActive() {
    this.isCategoryActive = !this.isCategoryActive;
  }


  handleOpenSubMenu(title: string) {
    this.isActiveMenu = (this.isActiveMenu === title) ? '' : title;
  }

  handleOpenSubCategory (title: string)  {
    if (title === this.openCategory) {
      this.openCategory = "";
    } else {
      this.openCategory = title;
    }
  };

  handleToggleActive = (type: string) => {
    if (type === this.isToggleActive) {
      this.isToggleActive = "";
    } else {
      this.isToggleActive = type;
    }
  };
}
