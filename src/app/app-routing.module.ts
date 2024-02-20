import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {ToResearchersComponent} from "./to-researchers/to-researchers.component";
import {SearchComponent} from "./search/search.component";
import {ProfileComponent} from "./profile/profile.component";
import {CandidateComponent} from "./candidate/candidate.component";

const routes: Routes = [
  {
    component: MainPageComponent,
    path: ''
  },
  {
    component: ToResearchersComponent,
    path: 'app'
  },
  {
    component: SearchComponent,
    path: 'search'
  },
  {
    component: CandidateComponent,
    path: 'search/:id'
  },
  {
    component: ProfileComponent,
    path: 'profile'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
