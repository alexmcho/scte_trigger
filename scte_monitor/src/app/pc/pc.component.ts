import { Component, OnInit } from '@angular/core';
import { ControlComponent } from '../control/control.component';

@Component({
  selector: 'app-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.css']
})
export class PcComponent implements OnInit {
  public index: number;
  public selfRef: PcComponent;
  public parentRef: ControlComponent;
  constructor() { }

  ngOnInit(): void {
  }

<<<<<<< HEAD
  removeProgram() {
		var T = document.getElementById("RemoveProgram");
		T.style.display = "none";  // <-- Set it to block
	}

=======
>>>>>>> GerardoBranch
}
