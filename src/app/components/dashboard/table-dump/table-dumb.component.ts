import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs'
import  TableModel from 'src/app/model/table-model';
import { NgxSpinnerService } from 'ngx-spinner';


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
  @Output() emitTabChangeEvent = new EventEmitter();
  tableData:TableModel;
  loading: false;
  ngOnInit() {
    //console.log(this.testdata);
    // this.dataSource.next([...this.dataSource.getValue(), {iterationcount:1,equipments:2}]);
    // this.dataSource.next([...this.dataSource.getValue(), {iterationcount:2,equipments:3}]);
    //3.84.150.172
    const socket = new SockJS('http://192.168.1.18:8080/aditazz-endpoint');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/data/tableData', function (hello) {
        //_this.showGreeting(hello.body);
        // alert(hello.body);
        _this.showGreeting(JSON.parse(hello.body));
      });
    });
  }
  ngOnChanges() {
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
    this.emitTabChangeEvent.emit(0);
  }
  setConnected(connected: boolean) {
    if (connected) {
      this.greetings = [];
    }
  }
  showGreeting(message) {
    if(message.total == true) {
      this.isExpansionDetailRow = false;
      this.totalobj = message.results[0];
    } else
    this.dataSource.next([...this.dataSource.getValue(), message.results[0]]);
    console.log(this.totalobj);
    // this.totalobj = message[message.length-1];
    // console.log(this.totalobj);
  }
  showAlert(outputMessage){
    alert(outputMessage);
  }
}
