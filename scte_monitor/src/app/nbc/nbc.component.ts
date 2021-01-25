import { Component, OnInit } from '@angular/core';
import { ControlComponent } from '../control/control.component';

@Component({
  selector: 'app-nbc',
  templateUrl: './nbc.component.html',
  styleUrls: ['./nbc.component.css']
})
export class NbcComponent implements OnInit {
  public index: number;
  public selfRef: NbcComponent;
  public parentRef: ControlComponent;
  constructor() { }

  ngOnInit(): void {
  }

  removeNational() {
		var T = document.getElementById("RemoveNational");
		T.style.display = "none";  // <-- Set it to block
	}

}
