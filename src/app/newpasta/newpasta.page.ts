import {Component, OnInit} from '@angular/core';
import {FoodserviceService} from "../foodservice.service";
import {Router} from "@angular/router";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

@Component({
  selector: 'app-newpasta',
  templateUrl: './newpasta.page.html',
  styleUrls: ['./newpasta.page.scss'],
})
export class NewpastaPage implements OnInit {
  new_name = "";
  new_desc = "";
  new_price = 0;
  new_url = "";
  new_spicy = false;
  arr_price: number[] = [];
  base64: any
  imageType: string = 'URL'

  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 50,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    const base64Image = 'data:image/png;base64,' + image.base64String;
    this.base64 = base64Image;
  }

  public alertButtons = ['OK']


  constructor(private foodservice: FoodserviceService, private router: Router) {
    this.arr_price = this.generateNumberOptions(30000, 50000, 2000)
  }

  ngOnInit() {
  }

  generateNumberOptions(start: number, end: number, step: number): number[] {
    const options: number[] = [];
    for (let i = start; i <= end; i += step) {
      options.push(i);
    }
    return options;
  }


  submitpasta() {
//this.foodservice.addPasta(this.new_name,this.new_url,this.new_desc,this.new_price)
    if (this.imageType == 'Camera') {
      this.new_url = "https://ubaya.xyz/hybrid/[NRP]/images/" + this.new_name + ".png"
      this.foodservice.uploadImage(this.new_name, this.base64).subscribe(
        (response: any) => {
          if (response.result === 'success') {
            alert("photo uploaded");
          }
        }
      )
    }

    this.foodservice.addPasta(this.new_name,
      this.new_url, this.new_desc, this.new_price).subscribe((response: any) => {
      if (response.result === 'success') {
        alert("success")
      } else {
        alert(response.message)
      }
    });
  }


}
