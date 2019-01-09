import { Component, OnInit } from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-graph-dumb',
  templateUrl: './graph-dumb.component.html',
  styleUrls: ['./graph-dumb.component.scss']
})
export class GraphDumbComponent implements OnInit {
  tempArray: any[] = [{
    name: 'TimevsObject',
    series: []}];
  single: any[] = [];
  view: any[] = [300, 250];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Objects';
  showYAxisLabel = true;
  yAxisLabel = 'Time';
  timeline = true;
  roundedDomains = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  
  constructor() {
  }
 
  ngOnInit() {
  }

  loadData(message){
    this.tempArray[0].series.push({"name": String(message.numberOfObjects), "value": (message.totalElpsedTime)});
    this.single = [...this.tempArray];
  }

}
