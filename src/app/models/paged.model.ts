export class PagedModel {

  constructor(
    public pageSize: number = 12,
    public pageNumber: number = 1,
    public search: string = '',
    public list: string[] = []
  ) { }

  get recordsTotal(): number {
    return this.list.filter(this.condition.bind(this)).length;
  }

  get pagesTotal(): number {
    return Math.ceil(this.recordsTotal / this.pageSize);
  }

  get start(): number {
    return (this.pageNumber - 1) * this.pageSize;
  }

  get end(): number {
    return this.start + this.pageSize;
  }

  get slice(): string[] {
    return this.list.filter(this.condition.bind(this)).slice(this.start, this.end);
  }

  condition(item: string): boolean {
    return item.toLowerCase().includes(this.search.toLowerCase());
  }

}
