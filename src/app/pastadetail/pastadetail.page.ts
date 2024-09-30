import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FoodserviceService} from "../foodservice.service";

@Component({
  selector: 'app-pastadetail',
  templateUrl: './pastadetail.page.html',
  styleUrls: ['./pastadetail.page.scss'],
})
export class PastadetailPage implements OnInit {

  index = 0;

  pastas:any[] = [];

  constructor(private route: ActivatedRoute,private foodservice:FoodserviceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.index = params['index'];
    })
    this.pastas = this.foodservice.pastas;
  }

}
