import { Component, OnInit } from '@angular/core';
import { ControlComponent } from '../control/control.component';

@Component({
  selector: 'app-lbc',
  templateUrl: './lbc.component.html',
  styleUrls: ['./lbc.component.css']
})
export class LbcComponent implements OnInit {
  public index: number;
  public selfRef: LbcComponent;
  public parentRef: ControlComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
