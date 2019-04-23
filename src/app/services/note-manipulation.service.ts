import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';

export interface MyNote {
  id: number;
  active: boolean;
  date: any;
  name: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class NoteManipulationService {

  private listData: MyNote[] = [];
  private myNotes: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor() {
    this.listData = JSON.parse(localStorage.getItem('NOTE_LIST'));
    this.myNotes.next(this.listData);
    addEventListener('storage', (event: StorageEvent) => {
      if (event.key === 'NOTE_LIST' ) {
        this.listData = JSON.parse(localStorage.getItem('NOTE_LIST'));
        this.myNotes.next(this.listData);
      }
    });
  }

  public getNotes(): Observable<any> {
    return this.myNotes.asObservable();
  }

  public createNote(note: MyNote): void {
    this.listData.push(note);
    this.myNotes.next(this.listData);
    this.storageUpdate(this.listData);
  }

  public togglNote(id: number): void {
    const index2 = this.listData.findIndex( element => element.id === id );
    this.listData[index2].active = !this.listData[index2].active;
    this.storageUpdate(this.listData);
  }

  public finedNote( str: string) {
    if (!str) {
      this.myNotes.next(this.listData);
    } else {
      const newNotesList = this.listData.filter( note => note.active && (note.name.indexOf(str)) > -1 );
      this.myNotes.next(newNotesList);
    }
  }

  public storageUpdate(list: MyNote[]) {
    localStorage.setItem('NOTE_LIST', JSON.stringify(list));
  }

  public getNotesLength(): number {
    return this.listData.length;
  }

}




