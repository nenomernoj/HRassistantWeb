import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.scss'
})
export class CandidateComponent implements OnInit {
  constructor(private apiService: ApiService) {
  }
  isVisibleTarif = false;
  // @ts-ignore
  data: any = JSON.parse(localStorage.getItem('selectedResume'));
  categories: any[] = [];

  ngOnInit() {
    console.log(this.data);
    this.getCategories();
  }

  getCategories(): void {
    this.apiService.getCategories().subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }

  getAge(dateString: string): number {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  renderCats(catId: any): string {
    console.log(catId);
    const category = this.categories.find(el => el.Id === Number(catId));
    console.log(category);
    const val = category ? category.Name : catId;
    return val;
  }
}
