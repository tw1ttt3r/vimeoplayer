import { Component, ViewChild } from '@angular/core';

import VimeoConfig from './interfaces/VimeoConfig';

import { CustomplayerComponent } from './components/customplayer/customplayer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vimeoangular';

  constructor() {}

  @ViewChild('customplayer1', {static: true}) customplayer1: CustomplayerComponent;

  config: VimeoConfig = {
    id: 399740154,
    autopause: false
  };

  bookmarks = [
    {
      time: 20,
      data: {
        id: 'dkbcfgadks',
        note: 'HOLA'
      }
    },
    {
      time: 5,
      data: {
        id: 'bgbgbg',
        note: 'COMO'
      }
    },
    {
      time: 100,
      data: {
        id: 'er4r4r4',
        note: 'ESTAS'
      }
    }
  ];

  addBookmark() {
    this.customplayer1.createBookmark();
    const newBook = this.customplayer1.getLastBookmarkCreated();
    this.bookmarks.push({time: newBook, data: { id: `new${newBook}`, note: `note${newBook}`}});
  }
}
