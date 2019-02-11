import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  debug : boolean;
  testObj: any = {};
  @Output() postNodeValues = new EventEmitter();
  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.debug = params.debug;
      }
    });
  }

  ngOnInit() {
    if(this.debug == undefined)
      this.debug = false;
    else{
      this.testnodes.spacing = false;
      this.testnodes.route = false;
      this.testnodes.place = false;
    } 
  }
  checkRouteValue(){
    if(this.testnodes.place == true) {
      this.testnodes.route = true;
    }
  }

  checkPlaceValue(){
    if(this.testnodes.place == true) {
      this.testnodes.route = true;
    }
  }

  runNewTest() {
    if(!this.debug) {
    this.testObj= {
      'url': this.testnodes.url,
      'projectName': this.testnodes.projectName,
      'minNodes': this.testnodes.minNodes,
      'maxNodes': this.testnodes.maxNodes,
      'incrementSize': this.testnodes.incrementSize,
      'iterationTimeLimit': this.testnodes.iterationTimeLimit,
      'overAllTimeLimit': this.testnodes.overAllTimeLimit,
      'spacing': false,
      'route': false,
      'place': false
    }
     this.postNodeValues.emit(this.testObj);
    console.log(this.testObj);
  }
    if(this.debug) {
      this.testObj= {
        'url': this.testnodes.url,
        'projectName': this.testnodes.projectName,
        'minNodes': this.testnodes.minNodes,
        'maxNodes': this.testnodes.maxNodes,
        'incrementSize': this.testnodes.incrementSize,
        'iterationTimeLimit': this.testnodes.iterationTimeLimit,
        'overAllTimeLimit': this.testnodes.overAllTimeLimit,
        'spacing': this.testnodes.spacing,
        'route': this.testnodes.route,
        'place': this.testnodes.place
      }
    this.postNodeValues.emit(this.testObj);
    console.log(this.testObj);
}
  }
onClick(event) {
  event.preventDefault();
  console.log(event.isTrusted);
}

print() {
  alert(this.testnodes.spacing);
}
}
