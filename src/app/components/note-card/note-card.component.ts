import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { myNote } from '../../services/note-manipulation.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input()
  public noteInfo: myNote;

  @Output()
  public actionNote = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
}
