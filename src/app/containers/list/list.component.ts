import { Component } from '@angular/core';
import { switchMap, zipAll, tap, map, of } from 'rxjs';

import { PagedModel } from 'src/app/models/paged.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  readonly paged: PagedModel = new PagedModel();

  pokemons: Pokemon[] = [];

  constructor(
    private _pokemonService: PokemonService
  ) {
    _pokemonService.getPagedPokemonNameList(100000, 0).pipe(
      tap(list => this.paged.list = list),
      map(() => this.paged.slice),
      switchMap(slice => slice.map(item => this._pokemonService.getPokemonByName(item))),
      zipAll()
    ).subscribe({
      next: slice => slice.forEach(item => this.pokemons.push(item)),
      error: err => { } // TODO: Implement error message
    });
  }

  onSearch(search: string): void {
    this.paged.search = search;
    this.paged.pageNumber = 1;
    this.pokemons = [];
    this.load();
  }

  onPage(pageNumber: number): void {
    this.paged.pageNumber = pageNumber;
    this.load();
  }

  load(): void {
    of(this.paged.slice).pipe(
      switchMap(slice => slice.map(item => this._pokemonService.getPokemonByName(item))),
      zipAll()
    ).subscribe({
      next: slice => slice.forEach(item => this.pokemons.push(item)),
      error: err => { } // TODO: Implement error message
    });
  }

}
