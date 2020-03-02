import { Component, OnInit } from '@angular/core';
import { TextLibrary } from '../../text';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  copyright = TextLibrary.COPYRIGHT;
  author = TextLibrary.NAME;
  gitUrl = TextLibrary.GIT_URL;

  dateTime = new Date();

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
