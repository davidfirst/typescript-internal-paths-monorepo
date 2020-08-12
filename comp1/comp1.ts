export class Comp1 {
  constructor(private _foo: string){}
  get foo(): string {
    return this._foo;
  }
}