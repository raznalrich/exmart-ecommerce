import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getPINData(pin:any) {
    return this.http.get('data/pincode.json').pipe(
      map((data:any) => {
        const filteredData = data.filter((item:any) => item.pincode === Number( pin));
        return filteredData;
      })
    );
  }

  getStateData(){
    const data = this.http.get('data/states.json')
    

    return data;
  }
}
