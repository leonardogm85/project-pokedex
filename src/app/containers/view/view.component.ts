import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, throwError } from 'rxjs';

import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonModel } from 'src/app/models/pokemon.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnDestroy {

  pokemon: PokemonModel | undefined;

  evolutions: PokemonModel[] = [];

  constructor(
    private _pokemonService: PokemonService,
    private _toastService: ToastService,
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
      error: () => _toastService.showError('Error when starting the page!')
    });
  }

  ngOnDestroy(): void {
    this._toastService.clear();
  }

}
