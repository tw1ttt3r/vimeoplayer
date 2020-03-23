import { Component, ViewChild, OnInit, ElementRef, AfterViewChecked } from '@angular/core';

import Player from '@vimeo/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'vimeoangular';

  constructor() {}

  @ViewChild('vimeoframe', {static: true}) frameVideo: ElementRef;

  player: any;

  ngOnInit() {
    console.log(this.frameVideo);
    this.player = new Player(this.frameVideo.nativeElement);
    console.log(this.player);
  }

  ngAfterViewChecked() {
    this.player.on('play', () => {
      console.log('play', this.player);
    });
  }
}
