import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkNamesService {
  networkName: String;

  constructor() { }

getName(): String{
  return this.networkName;
}

setName(name:String){
  this.networkName = name;
}
  
}
