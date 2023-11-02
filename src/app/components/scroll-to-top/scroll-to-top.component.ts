import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent {

  @HostListener('window:scroll', []) onScroll(): void {
    this.display =
      this._document.body.scrollTop > 20 || this._document.documentElement.scrollTop > 20
        ? 'block'
        : 'none';
  }

  display: string = 'none';

  constructor(
    @Inject(DOCUMENT) private _document: Document
  ) { }

  onClick(): void {
    this._document.body.scrollTop = 0;
    this._document.documentElement.scrollTop = 0;
  }

}
