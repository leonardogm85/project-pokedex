import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, map, switchMap, zipAll } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PokemonModel } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly _api: string = `${environment.api}`;

  constructor(
    private _httpClient: HttpClient
  ) { }

  getPagedPokemonNameList(limit: number, offset: number): Observable<string[]> {
    return this._httpClient.get<any>(`${this._api}/pokemon?limit=${limit}&offset=${offset}`).pipe(
      first(),
      map(data => {
        return this.toProperty<any[]>(data, 'results').map(item => this.toProperty<string>(item, 'name'));
      })
    );
  }

  getPokemonByName(name: string): Observable<PokemonModel> {
    return this._httpClient.get<any>(`${this._api}/pokemon/${name}`).pipe(
      first(),
      map(data => {
        return new PokemonModel(
          this.toProperty<number>(data, 'id'),
          this.toProperty<string>(data, 'name'),
          this.toProperty<string>(data, 'sprites.other.official-artwork.front_default'),
          this.toProperty<number>(data, 'base_experience'),
          this.toProperty<number>(data, 'height'),
          this.toProperty<number>(data, 'weight'),
          this.toProperty<any[]>(data, 'types').map(item => this.toProperty<string>(item, 'type.name')),
          this.toProperty<any[]>(data, 'abilities').map(item => this.toProperty<string>(item, 'ability.name')),
          this.toProperty<any[]>(data, 'stats').map(item => [
            this.toProperty<string>(item, 'stat.name'),
            this.toProperty<number>(item, 'base_stat')
          ])
        );
      })
    );
  }

  getPokemonEvolutionsByName(name: string): Observable<PokemonModel[]> {
    return this._httpClient.get<any>(`${this._api}/pokemon-species/${name}`).pipe(
      first(),
      switchMap(data => this._httpClient.get<any>(this.toProperty<string>(data, 'evolution_chain.url'))),
      map(data => {
        const evolutions: string[] = [];

        let chain = this.toProperty<string>(data, 'chain');

        while (true) {
          const species = this.toProperty<string>(chain, 'species.name');

          evolutions.push(species);

          const evolvesTo = this.toProperty<any[]>(chain, 'evolves_to');

          if (evolvesTo.length === 0) {
            break;
          }

          chain = evolvesTo[0];
        }

        return evolutions;
      }),
      switchMap(pokemons => pokemons.map(pokemon => this.getPokemonByName(pokemon))),
      zipAll()
    );
  }

  private toProperty<T>(data: any, path: string): T {
    const properties: string[] = path.split('.');

    const value: any = properties.reduce((previous: any, current: string) => {
      return previous[current];
    }, data);

    return value as T;
  }

}
