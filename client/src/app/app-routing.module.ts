import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  { path: ':id', component: ContentComponent },
  { path: '', component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
