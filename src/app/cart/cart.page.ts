import { Component, OnInit } from '@angular/core';
import {DexieService,MyItem} from "../dexie.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: MyItem[] = [];
  grandTotal: number = 0;

  constructor(private dex:DexieService) { }

  async loadItems() {
    try {
      this.items = await this.dex.getAllItems();
      this.calculateGrandTotal();
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }
  increaseNum(id:number)
  {
    this.dex.increaseNum(id).then(() => {
      this.loadItems()
    })
      .catch(error => {
        alert('Error :'+ error);
      });
  }

  decreaseNum(id: number) {
    this.dex.decreaseNum(id).then(() => {
      this.loadItems();
    }).catch(error => {
      alert('Error: ' + error);
    });
  }
  calculateGrandTotal() {
    this.grandTotal = this.items.reduce((total, item) => total + (item.price * item.num), 0);
  }


  ngOnInit() {
    this.loadItems()
  }


}
