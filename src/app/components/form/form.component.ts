import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MyNote, NoteManipulationService } from '../../services/note-manipulation.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public nodeForm: FormGroup;
  public pipe = new DatePipe('en-US');


  @Output()
  public createNote = new EventEmitter<any>();
  constructor(
    public noteManipulationService: NoteManipulationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.nodeForm = this.fb.group({
      nodeName: ['', Validators.required],
      nodeText: ['', Validators.required]
    });
  }

  public submit() {
    // bad way...
    const newId = this.noteManipulationService.getNotesLength() + 1;
    //
    const formValue = this.nodeForm.value;
    const nowDateString = this.pipe.transform(Date.now(), 'dd.MM.yy');
    const newNote: MyNote = {
      id: newId,
      active: true,
      date: nowDateString,
      name: formValue.nodeName,
      text: formValue.nodeText,
    };
    this.noteManipulationService.createNote(newNote);
    this.nodeForm.reset();
    this.createNote.emit();
  }
}
