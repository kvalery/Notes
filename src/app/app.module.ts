import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NoteManipulationService } from './services/note-manipulation.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    FormComponent,
    NoteListComponent,
    NoteCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    NoteManipulationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
