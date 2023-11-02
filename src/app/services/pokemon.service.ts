import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly _api: string = `${environment.api}`;

  constructor(
    private _httpClient: HttpClient
  ) { }

  pagedList(limit: number, offset: number): Observable<string[]> {
    return this._httpClient.get<any>(`${this._api}/pokemon?limit=${limit}&offset=${offset}`).pipe(
      first(),
      map(data => {
        return this.toProperty<any[]>(data, 'results').map(item => this.toProperty(item, 'name'));
      })
    );
  }

  getByName(name: string): Observable<Pokemon> {
    return this._httpClient.get<any>(`${this._api}/pokemon/${name}`).pipe(
      first(),
      map(data => {
        return new Pokemon(
          this.toProperty<number>(data, 'id'),
          this.toProperty<string>(data, 'name'),
          this.toProperty<string>(data, 'sprites.other.official-artwork.front_default'),
          this.toProperty<any[]>(data, 'types').map(item => this.toProperty(item, 'type.name'))
        );
      })
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
