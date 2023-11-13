import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, throwError } from 'rxjs';

import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  pokemon: Pokemon | undefined;

  evolutions: Pokemon[] = [];

  constructor(
    private _pokemonService: PokemonService,
    private _activatedRoute: ActivatedRoute
  ) {
    _activatedRoute.paramMap.pipe(
      switchMap(params => {
        return params.has('name')
          ? _pokemonService.getPokemonByName(params.get('name')!)
          : throwError(() => new Error('Parameter not found!'));
      }),
      tap(pokemon => this.pokemon = pokemon),
      switchMap(pokemon => _pokemonService.getPokemonEvolutionsByName(pokemon.name))
    ).subscribe({
      next: evolutions => this.evolutions = evolutions,
      error: err => { } // TODO: Implement error message
    });
  }

}
