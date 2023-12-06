import {BehaviorSubject, Observable} from "rxjs";

export class LangSwitcherService {
  activeLang: BehaviorSubject<any>;

  constructor() {
    this.activeLang = new BehaviorSubject<any>({});
  }

  getactiveLang(): Observable<any> {
    return this.activeLang.asObservable();
  }

  setactiveLang(value: any) {
    localStorage.setItem('lang', value);
    this.activeLang.next(value);
  }
}
