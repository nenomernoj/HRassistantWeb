import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NzIconService} from "ng-zorro-antd/icon";

@Injectable({
  providedIn: 'root'
})
export class IconLoaderService {

  constructor(private http: HttpClient, private iconService: NzIconService) {}

  loadIcon(name: string, path: string): void {
    this.http.get(path, { responseType: 'text' }).subscribe(svg => {
      this.iconService.addIconLiteral(name, svg);
    });
  }
}
