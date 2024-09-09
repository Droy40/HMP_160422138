import { Component, OnInit } from '@angular/core';

interface Product {
  productName: string,
  productDate: Date,
  productPrice: number,
}

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {
  // today: string = '8 September 2024'
  currentDate: Date;
  is5daysago: boolean;
  is5dayslater: boolean;
  numberclicked: number;
  quantity:number;  
  totalAmount:number;

  product: Product = {
    productName: 'Iphone 14',
    productDate: new Date(),
    productPrice: 14000000,
  }


  constructor() {
    this.currentDate = new Date();
    this.is5daysago = false;
    this.is5dayslater = false;
    this.numberclicked = 0;
    this.quantity = 0;    
    this.totalAmount = this.product.productPrice * this.quantity;
  }
  ngOnInit() {
  }
  today_ind(): string {

    const dayNamesArr: string[] = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const day = this.currentDate.getDay();

    // Get the current day (1-31)
    const d = this.currentDate.getDate();

    // Get the current month (0-11, where 0 is January and 11 is December)
    const arrayOfMonths: string[] = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    // const m = currentDate.getMonth() + 1; // Adding 1 to convert to 1-12 range
    const m = this.currentDate.getMonth();

    // Get the current year (four-digit year)
    const y = this.currentDate.getFullYear();

    return dayNamesArr[day] + ", " + d + '-' + arrayOfMonths[m] + '-' + y;
  }
  goYesterday() {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.numberclicked--;
    this.is5dayslater = false;
    this.is5daysago = false;
    if (this.numberclicked == -5) {
      this.is5daysago = true
    }
  }
  goTommorow() {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.numberclicked++;
    this.is5daysago = false;
    this.is5dayslater = false;
    if (this.numberclicked == 5) {
      this.is5dayslater = true;
    }
  }
  reset() {
    this.currentDate = new Date();
    this.is5daysago = false;
    this.is5dayslater = false;
    this.numberclicked = 0;
  }
  incQuantity(){
    this.quantity++;
    this.calculateTotalAmount();
  }
  decQuantity(){            
   if(this.quantity <= 0){
      this.quantity = 0;
   }
   else{
    this.quantity--;
   }
   this.calculateTotalAmount();
  }
  calculateTotalAmount(){
    this.totalAmount = this.product.productPrice * this.quantity;
  }
}

