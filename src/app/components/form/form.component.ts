import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MyNote, NoteManipulationService } from '../../services/note-manipulation.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  public noteForm: FormGroup;
  public pipe = new DatePipe('en-US');
  private currentNoteDetect: Subscription;

  @Output()
  public createNote = new EventEmitter<any>();
  constructor(
    public noteManipulationService: NoteManipulationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.noteForm = this.fb.group({
      id: [''],
      active: [true],
      date: [''],
      name: ['', Validators.required],
      text: ['', Validators.required]
    });

    this.currentNoteDetect = this.noteManipulationService.getCurrentNote()
      .subscribe( (note: MyNote ) =>  this.setCurrentNode(note) );
  }

  public setCurrentNode(note) {
    this.noteForm.patchValue({
      id: note.id,
      active: true,
      date: note.date,
      name: note.name,
      text: note.text});
  }

  public submit() {
    const formValue = this.noteForm.value;

    if (formValue.id) {
      this.noteManipulationService.editNote(formValue);
    } else {
      // bad way...
      const newId = this.noteManipulationService.getNotesLength() + 1;
      //
      const nowDateString = this.pipe.transform(Date.now(), 'dd.MM.yy');
      const newNote: MyNote = {
        id: newId,
        active: true,
        date: nowDateString,
        name: formValue.name,
        text: formValue.text,
      };
      this.noteManipulationService.createNote(newNote);
    }
    this.noteForm.reset();
    this.createNote.emit();
  }

  ngOnDestroy() {
    this.currentNoteDetect.unsubscribe();
  }
}
