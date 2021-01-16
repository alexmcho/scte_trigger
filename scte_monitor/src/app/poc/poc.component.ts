import { Component, OnInit } from '@angular/core';
import { ControlComponent } from '../control/control.component';

@Component({
  selector: 'app-poc',
  templateUrl: './poc.component.html',
  styleUrls: ['./poc.component.css']
})
export class PocComponent implements OnInit {
  public index: number;
  public selfRef: PocComponent;
  public parentRef: ControlComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
