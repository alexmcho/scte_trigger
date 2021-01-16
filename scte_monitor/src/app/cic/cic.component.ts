import { Component, OnInit } from '@angular/core';
import { ControlComponent } from '../control/control.component';

@Component({
  selector: 'app-cic',
  templateUrl: './cic.component.html',
  styleUrls: ['./cic.component.css']
})
export class CicComponent implements OnInit {
  public index: number;
  public selfRef: CicComponent;
  public parentRef: ControlComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
