import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { createScope } from '@angular/core/src/profile/wtf_impl';
import {DataSource} from '@angular/cdk/table';


import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface myNote {
  id: number;
  active: boolean;
  date: any;
  name: string;
  text: string
}

@Injectable({
  providedIn: 'root',
})
export class NoteManipulationService {

  private myNotes: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor() { }

  public getNotes(): Observable<myNote> {
    return this.myNotes.asObservable();
  }

  public createNote(note: myNote): void {
    const newNotesList = this.myNotes.getValue();
    newNotesList.push(note);
    this.myNotes.next(newNotesList);
  }

  public togglNote(id: number): void {
    const editedList = this.myNotes.getValue();
    const index = editedList.findIndex( element => element.id === id )
    editedList[index].active = !editedList[index].active;
    this.myNotes.next(editedList);
  }

  public finedNote( str: string) {
    console.log('-------')

    const source = from([1, 2, 3, 4, 6, 8, 4, 2, 5]);
    console.log(source)

    const example = source.pipe(filter(num => num % 2 === 0));

    const subscribe = example.subscribe(val => console.log(`Even number: ${val}`));

    console.log(source, example, subscribe  )
  }

  public getNotesLength(): number {
    return  (this.myNotes.getValue()).length;
  }


}




