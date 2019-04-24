import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyNote, NoteManipulationService } from '../../services/note-manipulation.service';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {

  public notesList: any = [];
  private listDetect: Subscription;

  constructor(
    public noteManipulationService: NoteManipulationService
  ) {}

  ngOnInit() {
    this.listDetect = this.noteManipulationService.getNotes()
      .subscribe( (notes: MyNote ) =>  this.notesList = notes );
  }

  public editNote( note: MyNote ) {
    this.noteManipulationService.setCurrentNote(note);
  }

  public togglNote( id: number ) {
    this.noteManipulationService.togglNote( id );
  }

  ngOnDestroy() {
    this.listDetect.unsubscribe();
  }

}
