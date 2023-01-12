import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElementService {
  constructor() {}

  getElementList() {
    return [
      { position: 1, activity: 'assets/clothes.png', item: 'papuci', price: '22', quantity: '2', },
      { position: 2, activity: 'assets/food.png', item: 'salata', price: '32', quantity: '1', },
    ];
  }
}
