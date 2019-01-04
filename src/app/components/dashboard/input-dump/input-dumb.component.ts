import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-dump',
  templateUrl: './input-dumb.component.html',
  styleUrls: ['./input-dumb.component.scss']
})
export class InputDumpComponent implements OnInit {
  numberOfNodes = [4,8,16,32,64,128,256]
  maximumnodes = [8,16,32,64,128,256]
  incrementsize = [2,4]
  overalltime = [120]
  optimizationLimit = [10]
  testnodes : any = {};
  @Output() postNodeValues = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  runNewTest() {
    this.postNodeValues.emit(this.testnodes);
    console.log(this.testnodes);
}
}
