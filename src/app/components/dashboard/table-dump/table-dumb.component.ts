import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs'
import  TableModel from 'src/app/model/table-model';
import { NgxSpinnerService } from 'ngx-spinner';
import 'rxjs/Rx';

export interface PeriodicElement {
  iterationcount: number;
  equipments: number;
  lines:number;
  numberOfObjects: number;
  numberOfRulesChecked: number;
  equivalency: string;
  isTimedOut: string;
  equipmentPlacementTime: number;
  pipeRouterTime: number;
  equivalencyTime: number;
  totalElpsedTime: number;
  throughput: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-table-dump',
  templateUrl: './table-dumb.component.html',
  styleUrls: ['./table-dumb.component.scss']
})
export class TableDumpComponent implements OnInit {
  displayedColumns: string[] = ['iterationcount','equipments', 'lines','numberOfObjects', 'numberOfRulesChecked','equivalency','isTimedOut','equipmentPlacementTime','pipeRouterTime','equivalencyVerifiedTime','totalElpsedTime','throughput','OutputFiles'];
  // dataSource:any = [];
  dataSource = new BehaviorSubject([]);
  tempSource:any = [];
  totalobj = {};
  private stompClient = null;
  greetings: string[] = [];
  isExpansionDetailRow = true;//(i: number, row: Object) => row.hasOwnProperty('detailRow');;
  constructor(private ref: ChangeDetectorRef,private spinner: NgxSpinnerService) { }
  @Input() testdata: any;
  @Input() username:any;
  @Output() emitTabChangeEvent = new EventEmitter();
  tableData:TableModel;
  loading:boolean =  true;
  ngOnInit() {
    //console.log(this.testdata);
    // this.dataSource.next([...this.dataSource.getValue(), {iterationcount:1,equipments:2}]);
    // this.dataSource.next([...this.dataSource.getValue(), {iterationcount:2,equipments:3}]);
    //3.84.150.172
   
   
  }
  ngOnChanges() {
    if(this.loading){
      const socket = new SockJS('http://3.84.150.172:8080/aditazz-endpoint');
      this.stompClient = Stomp.over(socket);
      const _this = this;
      this.stompClient.connect({}, function (frame) {
        _this.setConnected(true);
        console.log('Connected: ' + frame);
        console.log("socket url     :"+'/data/tableData/'+_this.username)
        _this.stompClient.subscribe('/data/tableData/'+_this.username, function (hello) {
          //_this.showGreeting(hello.body);
          // alert(hello.body);
          _this.showGreeting(JSON.parse(hello.body));
        });
      });
      this.loading = false;
    }
   
    // alert(this.username);
    // this.dataSource.next([...this.dataSource.getValue(), {iterationcount:1,equipments:2}]);
    // this.dataSource.next([...this.dataSource.getValue(), {iterationcount:2,equipments:3,detailRow:true}]);
   // this.dataSource = this.tempSource;
    // console.log(this.testdata);
    // this.dataSource = this.testdata;
    // if ( this.testdata) {
    //   this.totalobj = this.testdata[this.testdata.length-1];
    //   console.log(this.totalobj);
    //   this.dataSource.splice(-1,1)
    // }
  }
  dispatchTabChangeEvent(){
    this.dataSource = new BehaviorSubject([]);
    this.isExpansionDetailRow = true;
    this.emitTabChangeEvent.emit(0);
  }
  setConnected(connected: boolean) {
    if (connected) {
      this.greetings = [];
    }
  }
  showEquivalencyText(message:any){
    alert(message);
  }

  showGreeting(message) {
    if(message.total == true) { 
      this.isExpansionDetailRow = false;
      this.totalobj = message.results[0];
    } else
    this.dataSource.next([...this.dataSource.getValue(), message.results[0]]);
    console.log(this.totalobj);
  }
  showUpdatedLibrary(outputMessage){
    this.downloadOutputText(outputMessage,"updateLibrary.txt");
  }
  
  showPfdJson(outputMessage){
    this.downloadOutputText(outputMessage,"pfdJson.txt");
  }

  showPlanJson(outputMessage){
    this.downloadOutputText(outputMessage,"planJson.txt");
  }

  downloadOutputText(outputMessage, filename){
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([outputMessage], { type: 'text' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
  }

  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
        //Now convert each value to string and comma-separated
        row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
  }
}
