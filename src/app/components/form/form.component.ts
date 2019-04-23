import { Component, OnInit } from '@angular/core';
import { myNote, NoteManipulationService } from '../../services/note-manipulation.service';
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
    // bad way needs more time
    const newId = this.noteManipulationService.getNotesLength() + 1;
    //
    const formValue = this.nodeForm.value;
    const nowDateString = this.pipe.transform(Date.now(), 'dd.MM.yy');
    const newNote: myNote = {
      id: newId,
      active: true,
      date: nowDateString,
      name: formValue.nodeName,
      text: formValue.nodeText,
    };

    console.log(newId)
    this.noteManipulationService.createNote(newNote);

    this.nodeForm.reset();
  }

  public cleanForm() {
    this.nodeForm.reset();
  }

}
