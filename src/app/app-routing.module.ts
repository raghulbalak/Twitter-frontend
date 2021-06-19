import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InitialPageComponent } from "./initial-page/initial-page.component";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { SignupComponent } from "./signup/signup.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { AuthGuard } from "./auth.guard";
import { MyTweetsComponent } from "./my-tweets/my-tweets.component";

export const routes: Routes = [
    {path: '', component: InitialPageComponent},
    {path: 'login', component: LoginComponent},
    {path:'header', component: HeaderComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'home-page', component: HomepageComponent, canActivate: [AuthGuard]},
    {path: 'my-tweets', component: MyTweetsComponent, canActivate: [AuthGuard]}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    declarations: [

    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}