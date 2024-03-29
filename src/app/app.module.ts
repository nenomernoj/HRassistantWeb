import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IconDefinition} from '@ant-design/icons-angular';
import {AppRoutingModule} from './app-routing.module';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzGridModule} from "ng-zorro-antd/grid";
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {StepBackwardOutline, AlertFill, AlertOutline, LogoutOutline} from '@ant-design/icons-angular/icons';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {ru_RU} from 'ng-zorro-antd/i18n';
import {NgOptimizedImage, registerLocaleData} from '@angular/common';
import ru from '@angular/common/locales/ru';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToResearchersComponent} from './to-researchers/to-researchers.component';
import {SearchComponent} from './search/search.component';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {ProfileComponent} from './profile/profile.component';
import {CandidateComponent} from './candidate/candidate.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import { RegisterComponent } from './header/register/register.component';
import { LoginComponent } from './header/login/login.component';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NgxPassCodeModule} from "ngx-pass-code";
import {NzNotificationServiceModule} from "ng-zorro-antd/notification";
import {NzSpinModule} from "ng-zorro-antd/spin";
import { ModalTarifComponent } from './modal-tarif/modal-tarif.component';
import {NzSpaceModule} from "ng-zorro-antd/space";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {NzTagModule} from "ng-zorro-antd/tag";

registerLocaleData(ru);
const icons: IconDefinition[] = [StepBackwardOutline, AlertOutline, AlertFill, LogoutOutline];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    ToResearchersComponent,
    SearchComponent,
    ProfileComponent,
    CandidateComponent,
    RegisterComponent,
    LoginComponent,
    ModalTarifComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NzButtonModule,
        NzGridModule,
        HttpClientModule,
        NzSelectModule,
        FormsModule,
        BrowserAnimationsModule,
        NzIconModule.forRoot(icons),
        NzAvatarModule,
        NzModalModule,
        NzFormModule,
        NzInputModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        NgxMaskPipe,
        NzDividerModule,
        NgxPassCodeModule,
        NzNotificationServiceModule,
        NgOptimizedImage,
        NzSpinModule,
        NzSpaceModule,
        NzTagModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: NZ_I18N, useValue: ru_RU},
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
