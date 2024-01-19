import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [
  { path: '', component: JournalComponent },
  { path: '**', redirectTo: '' }, // Redirect to the welcome page for any unknown route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
