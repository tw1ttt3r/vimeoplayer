import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

import Player from '@vimeo/player';

@Component({
  selector: 'app-customplayer',
  templateUrl: './customplayer.component.html',
  styleUrls: ['./customplayer.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CustomplayerComponent implements OnInit {

  constructor() { }

  @ViewChild('wrapperPlayer', {static: true}) customplayer: ElementRef;

  @Input() idvimeo: number;
  @Input() wplayer = 640;

  optionsPlayer: any;

  player: any;

  playerPlayed = false;

  ngOnInit(): void {
    if (this.idvimeo === undefined) {
      throw new Error('The ID or USER is REQUIRED!');
    } else {
      this.optionsPlayer = {
        id: this.idvimeo,
        width: this.wplayer,
        controls: false
      };
      this.player = new Player(this.customplayer.nativeElement, this.optionsPlayer);
    }
  }

  playPlayer() {
    (!this.playerPlayed ? this.player.play() : this.player.pause());
    this.playerPlayed = !this.playerPlayed;
  }

}
