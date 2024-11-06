import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FoodserviceService} from "../foodservice.service";

@Component({
  selector: 'app-pastadetail',
  templateUrl: './pastadetail.page.html',
  styleUrls: ['./pastadetail.page.scss'],
})
export class PastadetailPage implements OnInit {

  pasta:any={};
  insertStep="";
  insertInstruction="";

  constructor(private route: ActivatedRoute,private foodservice:FoodserviceService,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.foodservice.pastaDetail(params['index']).subscribe(
        (data)=> {
          this.pasta=data;
        }
      )
    })

  }
  deletepasta(id:any) {
    this.foodservice.deletePasta(id).subscribe((response: any) => {
      if(response.result==='success'){
        alert("success")
        this.router.navigate(['/pasta'])
      }
      else {
        alert(response.message)
      }
    });
  }
  insertPastaInstruction() {
    this.foodservice.addPastaInstruction(this.pasta.id,this.insertStep,this.insertInstruction).subscribe((response: any) => {
      if(response.result==='success'){
        alert("success")
        this.ngOnInit()
        this.insertStep=""
        this.insertInstruction=""
      }
      else {
        alert(response.message)
      }
    });
  }


}
