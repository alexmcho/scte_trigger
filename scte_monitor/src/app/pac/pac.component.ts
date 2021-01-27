import { Component, OnInit } from '@angular/core';
import { ControlComponent } from '../control/control.component';

@Component({
  selector: 'app-pac',
  templateUrl: './pac.component.html',
  styleUrls: ['./pac.component.css']
})
export class PacComponent implements OnInit {
  public index: number;
  public selfRef: PacComponent;
  public parentRef: ControlComponent;
  constructor() { }

  ngOnInit(): void {
  }

<<<<<<< HEAD
  removeProvider() {
		var T = document.getElementById("RemoveProvider");
		T.style.display = "none";  // <-- Set it to block
	}

=======
>>>>>>> GerardoBranch
}
