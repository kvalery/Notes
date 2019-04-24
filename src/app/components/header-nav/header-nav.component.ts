import { Component, OnInit } from '@angular/core';
import { NoteManipulationService } from '../../services/note-manipulation.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  constructor(
    public noteManipulationService: NoteManipulationService
  ) {
  }

  ngOnInit() {

  }

  public onSerch( serchStr: string ) {
    this.noteManipulationService.finedNote(serchStr);
  }

}
