import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FoodserviceService} from "../foodservice.service";

@Component({
  selector: 'app-pastadetail',
  templateUrl: './pastadetail.page.html',
  styleUrls: ['./pastadetail.page.scss'],
})
export class PastadetailPage implements OnInit {

  pasta:any={};

  constructor(private route: ActivatedRoute,private foodservice:FoodserviceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.foodservice.pastaDetail(params['index']).subscribe(
        (data)=> {
          this.pasta=data;
        }
      )
    })

  }

}
