import { Component } from '@angular/core';
import {IconLoaderService} from "../icon-loader.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private iconLoader: IconLoaderService) {
    this.iconLoader.loadIcon('login', 'assets/outline/login.svg');
  }
}
