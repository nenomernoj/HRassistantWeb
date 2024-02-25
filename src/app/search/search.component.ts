import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {timeout} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
  }

  loading = false;
  list: any[] = [];
  categories: any[] = [];
  cityId: any = 0;
  categoryId: any = 0;

  ngOnInit() {
    this.getAllResumes();
    this.getCategories();
  }

  getCategories(): void {
    this.apiService.getCategories().subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }

  getAllResumes(): void {
    this.loading = true;
    this.apiService.getAllresumes(this.categoryId, this.cityId).subscribe(res => {
      console.log(res);
      this.list = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  showDetails(data: any): void {
    localStorage.setItem('selectedResume', JSON.stringify(data));
    this.router.navigate(['/search/detail']);
  }

  /*  renderCategory(id: number): string {
      const cat = this.categories.find((el: any) => el.Id === id);
      return cat ? cat.Name : String(id);
    }*/
}
