import { Component, OnInit } from '@angular/core';
import {FoodserviceService} from "../foodservice.service";

@Component({
  selector: 'app-pasta',
  templateUrl: './pasta.page.html',
  styleUrls: ['./pasta.page.scss'],
})
export class PastaPage implements OnInit {
  search:string = "";
  pastas:any[] = [];

  jenistampilan: string = "accordion";

  constructor(private foodservice:FoodserviceService) {

  }

  chunkArray(arr: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  ngOnInit() {
    this.foodservice.pastaList(this.search).subscribe(
      (data)=> {
        this.pastas=data;
      }
    );
  }

}
