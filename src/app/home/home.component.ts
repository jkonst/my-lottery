import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TextLibrary } from '../shared/text';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  appTitle = TextLibrary.APP_TITLE;
  appDesc = TextLibrary.APP_DESCRIPTION;
  appGoal = TextLibrary.APP_GOAL;
  howTo = TextLibrary.APP_HOW_TO;
  goToFile = TextLibrary.FILE;
  goToWinners = TextLibrary.WINNERS;
  fileDesc = TextLibrary.APP_FILE_DESCRIPTION;
  winnersDesc = TextLibrary.APP_FILE_WINNERS;
  twitterSrc = TextLibrary.TWITTER_SRC;
  copyright = TextLibrary.COPYRIGHT;
  author = TextLibrary.NAME;
  gitUrl = TextLibrary.GIT_URL;

  dateTime = new Date();

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
