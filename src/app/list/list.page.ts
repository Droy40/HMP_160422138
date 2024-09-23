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
  quantity: number;
  totalAmount: number;

  couponcode: string;
  strvalid: string;
  discountCoupon: number;

  textColor: string;

  product: Product = {
    productName: 'Iphone 14',
    productDate: new Date(),
    productPrice: 14000000,
  }

  books = [
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publishedDate: new Date('1960-07-11'),
      price: 7.99,
      discount: 5,
      getPriceAfterDiscount():number{
        return this.price * (1 - (this.discount/100));
      }
      
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedDate: new Date('1925-04-10'),
      price: 10.99,
      discount:10,
      getPriceAfterDiscount():number{
        return this.price * (1 - (this.discount/100));
      }
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publishedDate: new Date('1813-01-28'),
      price: 12.75,
      discount: 10,
      getPriceAfterDiscount():number{
        return this.price * (1 - (this.discount/100));
      }
    }
  ]



  constructor() {
    this.currentDate = new Date();
    this.is5daysago = false;
    this.is5dayslater = false;
    this.numberclicked = 0;
    this.quantity = 0;
    this.totalAmount = this.product.productPrice * this.quantity;

    this.couponcode = "0000";
    this.strvalid = "invalid";
    this.discountCoupon = 0;
    this.textColor = "red";


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
  incQuantity() {
    this.quantity++;
    this.calculateTotalAmount();
  }
  decQuantity() {
    if (this.quantity <= 0) {
      this.quantity = 0;
    }
    else {
      this.quantity--;
    }
    this.calculateTotalAmount();
  }
  calculateTotalAmount() {
    this.totalAmount = this.product.productPrice * this.quantity;
  }
  checkValid() {
    if (this.couponcode == "1234") {
      this.strvalid = "valid";
      this.discountCoupon = 5;
      this.textColor = "green";
    }
    else if (this.couponcode == "6789") {
      this.strvalid = "valid";
      this.discountCoupon = 10;
      this.textColor = "green";
    }
    else {
      this.strvalid = "invalid";
      this.discountCoupon = 0;
      this.textColor = "red";
    }
  }
}

