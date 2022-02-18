import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TextLibrary } from './text';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  appTitle = TextLibrary.APP_TITLE;
  appGoal = TextLibrary.APP_GOAL;
  howTo = TextLibrary.APP_HOW_TO;
  goToFile = TextLibrary.FILE;
  goToWinners = TextLibrary.WINNERS;
  fileDesc = TextLibrary.APP_FILE_DESCRIPTION;
  winnersDesc = TextLibrary.APP_FILE_WINNERS;
  twitterSrc = TextLibrary.TWITTER_SRC;

  constructor(public sanitizer: DomSanitizer) {}
}
