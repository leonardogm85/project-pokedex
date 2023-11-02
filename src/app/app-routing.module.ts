import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './containers/list/list.component';
import { ViewComponent } from './containers/view/view.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: '**', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
