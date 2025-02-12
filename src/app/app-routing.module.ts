import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertPptxComponent } from './components/convert-file/convert-pptx/convert-pptx.component';
const routes: Routes = [
  { path: '', redirectTo: 'convert', pathMatch: 'full' },
  { path: 'convert', component: ConvertPptxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
