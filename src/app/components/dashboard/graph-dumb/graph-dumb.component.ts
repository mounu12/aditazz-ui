import { Component, OnInit } from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { curveLinear } from 'd3-shape';

@Component({
  selector: 'app-graph-dumb',
  templateUrl: './graph-dumb.component.html',
  styleUrls: ['./graph-dumb.component.scss']
})
export class GraphDumbComponent implements OnInit {
  curve: any = curveLinear;
  tempArray_line1: any[] = [{
    name: 'TimevsObject',
    series: []}];
  tempArray_line2: any[] = [{
      name: 'ThroughputvsObject',
      series: []}];
  tempArray_line3: any[] = [{
        name: 'EquipmentTimevsEquipment',
        series: []}];
  tempArray_line4: any[] = [{
          name: 'PipeTimevsPipes',
          series: []}];

  single_line1: any[] = [];
  single_line2: any[] = [];
  single_line3: any[] = [];
  single_line4: any[] = [];
  view: any[] = [300, 250];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel_line1 = 'Objects';
  xAxisLabel_line2 = 'Objects';
  xAxisLabel_line3 = 'Equipment';
  xAxisLabel_line4 = 'Pipes';
  showYAxisLabel = true;
  yAxisLabel = 'Time';
  timeline = true;
  roundedDomains = true;

  colorScheme_line1 = {
    domain: ['#2B69FA']
  };
  colorScheme_line2 = {
    domain: ['#1EA362']
  };
  colorScheme_line3 = {
    domain: ['#F6A725']
  };
  colorScheme_line4 = {
    domain: ['#FF5052']
  };

  // line, area
  autoScale = true;
  
  constructor() {
  }
 
  ngOnInit() {
  }

  loadData(message){
    // this.tempArray_line1 = [{
    //   name: 'TimevsObject',
    //   series: []}];
    this.tempArray_line1[0].series.push({"name": String(message.numberOfObjects), "value": (message.totalElpsedTime)});
    this.single_line1 = [...this.tempArray_line1];
    // this.tempArray_line2 = [{
    //   name: 'ThroughputvsObject',
    //   series: []}];
    this.tempArray_line2[0].series.push({"name": String(message.numberOfObjects), "value": (message.throughput)})
    this.single_line2 = [...this.tempArray_line2];
    // this.tempArray_line3 = [{
    //   name: 'EquipmentTimevsEquipment',
    //   series: []}];
    this.tempArray_line3[0].series.push({"name": String(message.equipments), "value": (message.equipmentPlacementTime)})
    this.single_line3 = [...this.tempArray_line3];
    // this.tempArray_line4 = [{
    //   name: 'PipeTimevsPipes',
    //   series: []}];
    this.tempArray_line4[0].series.push({"name": String(message.lines), "value": (message.pipeRouterTime)})
    this.single_line4 = [...this.tempArray_line4];
  }
}
