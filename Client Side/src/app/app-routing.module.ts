import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then(m => m.StoreModule )
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
