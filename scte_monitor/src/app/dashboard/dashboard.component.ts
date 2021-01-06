import { Component, Injectable, Input, OnInit } from '@angular/core';

import { KeyNumber } from "../key-value";
import { KeyString } from "../key-value";
import { KeyBool } from "../key-value"
import { KeyStringArray } from "../key-value";
import { KeyNumberArray } from "../key-value"
import { KeyObject } from "../key-value";
import { LoadJsonService } from '../load-json.service';
import { LocalBreak } from "../template_definitions";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NetworkNamesService } from '../network-names.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { asWindowsPath } from '@angular-devkit/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

@Injectable()
export class DashboardComponent implements OnInit {
  public config: KeyObject;
  public existingTemplates = <string[]>[];
  closeResult = ''; 
  networks:String;
  input_field: String = "";
  public input: String;


  constructor(private LoadJsonService: LoadJsonService, private modalService: NgbModal, private httpClient:HttpClient, private NetworkNamesService: NetworkNamesService) {
    let url = "http://127.0.0.1:8000/get/"+this.NetworkNamesService.getName();
    //let url = "/assets/config.json"
      this.LoadJsonService.getConfig(url).subscribe(data => {
      this.config = data;
      console.log(this.config)
      for(let i = 3; i < this.config.value.length; i++) {
        this.existingTemplates.push(this.config.value[i].key)
      }
    })
    }

    func(name: String){
      this.NetworkNamesService.setName(name);
      this.input = name;
    }
    
    get getInput():String{
      return this.input;
    }
  
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Network Created Successfuly`;
      }, (reason) => {
        this.closeResult = ``;
      });
    }

    saveButton(){
      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var inputValue = (<HTMLInputElement>document.getElementById("networkName")).value;
      var row = body.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      //cell1.innerHTML = i.toString();
      cell2.innerHTML = inputValue.toString();
      this.addNetwork(inputValue);
    }

    getNetworks(){
      return this.httpClient.get<String>("http://127.0.0.1:8000/networks")
    }

    addNetwork(networkname: String){
      console.log("ADDNETWORK")
      var network = {
        "network_id":networkname
        ,"local_brk_start_action":""
        ,"local_brk_start_splice_immidate_flag":""
        ,"local_brk_start_splice_event_id":""
        ,"local_brk_start_duration_flag":""
        ,"local_brk_star_duration_min":""
        ,"local_brk_star_duration_max":""
        ,"local_brk_end_action":""
        ,"local_brk_end_splice_immidiate_flag":""
        ,"local_brk_end_splice_event_id":""
    }
    console.log(network)
    let postHeaders = new HttpHeaders({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    this.httpClient.post("http://127.0.0.1:8000/addNetworkName", network, {headers: postHeaders})
    .subscribe(Response => console.log(Response));
    }

    networkscan(){
      var body: HTMLTableElement = <HTMLTableElement> document.getElementById("tbody1");
      var row = body.insertRow(1);
      var cell= row.insertCell(0);
      for(let item of this.networks){
        cell.innerHTML = item.toString()
      }
    }
  
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
  
  ngOnInit(): void {
    this.getNetworks().subscribe(
			networkArr => this.networks = networkArr
    )
  }
}