import {Component, OnInit} from '@angular/core';
import {FoodserviceService} from "../foodservice.service";
import {DexieService} from "../dexie.service";

@Component({
  selector: 'app-pasta',
  templateUrl: './pasta.page.html',
  styleUrls: ['./pasta.page.scss'],
})
export class PastaPage implements OnInit {
  search: string = "";
  pastas: any[] = [];

  jenistampilan: string = "accordion";

  constructor(private foodservice: FoodserviceService, private dex:DexieService) {

  }

  chunkArray(arr: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  ionViewWillEnter() {
    this.foodservice.pastaList().subscribe((data) => {
      this.pastas = data;
    })
  }
  addtocart(id:number,name:string,price:number,num:number)
  {
    this.dex.addItem(id,name,price,num).then(() => {
      alert('Item added successfully.');
    })
      .catch(error => {
        alert('Error adding item:'+ error);
      });
  }



  ngOnInit() {
    this.foodservice.pastaList(this.search).subscribe(
      (data) => {
        this.pastas = data;
      }
    );
  }


}
