import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  @Input() pageNumber: number = 1;
  @Input() pagesTotal: number = 0;

  @Output() page: EventEmitter<number> = new EventEmitter<number>();

  get disabled(): boolean {
    return this.pageNumber === this.pagesTotal;
  }

  onPage(): void {
    this.page.emit(++this.pageNumber);
  }

}
