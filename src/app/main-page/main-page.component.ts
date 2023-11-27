import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzSelectModule} from "ng-zorro-antd/select";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, NzGridModule, NzButtonModule, NzTypographyModule, NzSelectModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
