import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FoodserviceService {
  constructor(private http: HttpClient) { }

  pastas = [];
  link = "https://ubaya.xyz/hybrid/160422138/"
  pastaList(search:string = ""):Observable<any> {
    return this.http.get(this.link + "pastas.php?search=" + search);
  }
  addPasta(p_name:string,p_url:string,p_description:string,p_price:number)
  {
    //this.pastas.push({name:p_name,url:p_url,description:p_description,price:p_price})
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('name', p_name);
    body.set('desc', p_description);
    body.set('url', p_url);
    body.set('price', p_price.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      "https://ubaya.xyz/hybrid/160422138/new_pasta.php", urlEncodedData, { headers });
  }
  pastaDetail(id:number){
    return this.http.get(this.link + "pasta_detail.php?id="+id);
  }
  updatePasta(p_id:number,p_name:string,p_url:string,p_description:string,p_price:number)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
    body.set('name', p_name);
    body.set('desc', p_description);
    body.set('url', p_url);
    body.set('price', p_price.toString());
    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.xyz/hybrid/160422138/update_pasta.php", urlEncodedData, { headers });
  }
  deletePasta(p_id:number)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('id', p_id.toString()); const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.xyz/hybrid/160422138/delete_pasta.php", urlEncodedData, { headers });
  }
  addPastaInstruction(p_idpasta:string,p_step:string,p_instruction:string)
  {
    //this.pastas.push({name:p_name,url:p_url,description:p_description,price:p_price})
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('pasta_id', p_idpasta);
    body.set('step', p_step);
    body.set('instruction', p_instruction);
    const urlEncodedData = body.toString();
    return this.http.post(
      "https://ubaya.xyz/hybrid/160422138/new_instruction.php", urlEncodedData, { headers });
  }


}
