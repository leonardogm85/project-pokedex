import { Component, Input } from '@angular/core';

import { PokemonModel } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() pokemon: PokemonModel | undefined;

}
