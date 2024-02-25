import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<any> {
    return this.http.get(`/resumes/category`);
  }

  getAllresumes(categoryId: any, cityId: any): Observable<any> {
    console.log(categoryId, cityId)
    let params = new HttpParams();
    if (categoryId) {
      params = params.append('categoryId', categoryId);
    }
    if (cityId) {
      params = params.append('cityId', cityId);
    }
    return this.http.get(`/org/getAllResumesByOrg`, {params});
  }
}
