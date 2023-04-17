import { Routes } from "@angular/router";
import { AdminGuard } from "src/app/guard/admin.guard";
import { DashboardComponent } from "./dashboard.component";
import { LogginGuard } from "src/app/guard/loggin.guard";
const user = () => JSON.parse(localStorage['user'] || '{}');

export const DashboarRoutes: Routes = [
  {path: '', redirectTo: user().role == 'ADMIN'? 'admin' : 'user', pathMatch: 'full'},

  {path: 'admin', canActivate: [AdminGuard], component: DashboardComponent},
  {path: 'user', canActivate: [LogginGuard], component: DashboardComponent},

]
