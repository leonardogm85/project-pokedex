import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() list: string[] = [];

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  term: string = '';

  fnSearch: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.list.filter(item => item.toLowerCase().includes(term.toLowerCase())).slice(0, 10),
      ),
    );

  onSearch(): void {
    this.search.emit(this.term);
  }

}
