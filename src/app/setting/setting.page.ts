import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  url: string;
  password: string;
  isMoreThan6Char: boolean;
  isContainNumber: boolean;
  isIncludeSpecialChar: boolean;
  constructor() {
    this.url = "";
    this.password = "";
    this.isMoreThan6Char = false;
    this.isContainNumber = false;
    this.isIncludeSpecialChar = false;
  }

  ngOnInit() {
  }
  checkPassword() {
    this.isMoreThan6Char = this.password.length >= 6 ? true : false;

    this.isContainNumber = /\d/.test(this.password);

    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    this.isIncludeSpecialChar = format.test(this.password);
  }

}
