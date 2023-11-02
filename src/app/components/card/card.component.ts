import { Component, Input } from '@angular/core';

import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() pokemon?: Pokemon;

  getTypeClasses(type: string): string[] {
    return [
      'badge',
      `bg-type-${type}`,
      'me-1',
      'mb-1'
    ];
  }

  getPokemonNumber(id: number): string {
    return `N. ${id.toString().padStart(4, '0')}`;
  }

}
