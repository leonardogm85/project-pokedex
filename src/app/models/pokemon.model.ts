export class PokemonModel {

  constructor(
    public id: number,
    public name: string,
    public image: string,
    public experience: number,
    public height: number,
    public weight: number,
    public types: string[],
    public abilities: string[],
    public stats: [string, number][]
  ) { }

}
