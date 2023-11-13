import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appType]'
})
export class TypeDirective implements OnInit {

  @HostBinding('class.bg-type-bug') bug: boolean = false;
  @HostBinding('class.bg-type-dark') dark: boolean = false;
  @HostBinding('class.bg-type-dragon') dragon: boolean = false;
  @HostBinding('class.bg-type-electric') electric: boolean = false;
  @HostBinding('class.bg-type-fairy') fairy: boolean = false;
  @HostBinding('class.bg-type-fighting') fighting: boolean = false;
  @HostBinding('class.bg-type-fire') fire: boolean = false;
  @HostBinding('class.bg-type-flying') flying: boolean = false;
  @HostBinding('class.bg-type-ghost') ghost: boolean = false;
  @HostBinding('class.bg-type-grass') grass: boolean = false;
  @HostBinding('class.bg-type-ground') ground: boolean = false;
  @HostBinding('class.bg-type-ice') ice: boolean = false;
  @HostBinding('class.bg-type-normal') normal: boolean = false;
  @HostBinding('class.bg-type-poison') poison: boolean = false;
  @HostBinding('class.bg-type-psychic') psychic: boolean = false;
  @HostBinding('class.bg-type-rock') rock: boolean = false;
  @HostBinding('class.bg-type-steel') steel: boolean = false;
  @HostBinding('class.bg-type-water') water: boolean = false;

  @Input() appType: string = 'normal';

  ngOnInit(): void {
    switch (this.appType) {
      case 'bug': this.bug = true; break;
      case 'dark': this.dark = true; break;
      case 'dragon': this.dragon = true; break;
      case 'electric': this.electric = true; break;
      case 'fairy': this.fairy = true; break;
      case 'fighting': this.fighting = true; break;
      case 'fire': this.fire = true; break;
      case 'flying': this.flying = true; break;
      case 'ghost': this.ghost = true; break;
      case 'grass': this.grass = true; break;
      case 'ground': this.ground = true; break;
      case 'ice': this.ice = true; break;
      case 'normal': this.normal = true; break;
      case 'poison': this.poison = true; break;
      case 'psychic': this.psychic = true; break;
      case 'rock': this.rock = true; break;
      case 'steel': this.steel = true; break;
      case 'water': this.water = true; break;
    }
  }

}
