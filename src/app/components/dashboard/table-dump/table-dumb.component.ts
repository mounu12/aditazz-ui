import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef,ViewChild, ElementRef } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs'
import  TableModel from 'src/app/model/table-model';
import { NgxSpinnerService } from 'ngx-spinner';
import 'rxjs/Rx';
import * as XLSX from 'xlsx';
import { GraphDumbComponent } from '../graph-dumb/graph-dumb.component';

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
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(GraphDumbComponent) graphComp: ElementRef;

  constructor(private ref: ChangeDetectorRef,private spinner: NgxSpinnerService) { }
  @Input() testdata: any;
  @Input() username:any;
  @Output() emitTabChangeEvent = new EventEmitter();
  @Output() emitloadGraphDataEvent = new EventEmitter();

  tableData:TableModel;
  loading:boolean =  true;
  ngOnInit() {
}
  ngOnChanges() {
    if(this.loading){
      const socket = new SockJS('http://localhost:8080/aditazz-endpoint');
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
  }
  dispatchTabChangeEvent(){
    this.dataSource = new BehaviorSubject([]);
    this.totalobj = {};
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
    } else{
      this.dataSource.next([...this.dataSource.getValue(), message.results[0]]);
      this.emitloadGraphDataEvent.emit(message.results[0]);
    }
   
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
  showTextJson(outputMessage){
    this.downloadOutputText(outputMessage,"textJson.txt");
  }


  downloadOutputText(outputMessage, filename){
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([outputMessage], { type: 'application/json' });
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

  exportTableToCSV() {
      const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
      (this.table.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      /* save to file */
      XLSX.writeFile(wb, 'Tabledata.csv');
  }
}
