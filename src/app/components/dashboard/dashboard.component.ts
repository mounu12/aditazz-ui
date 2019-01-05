import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import {ConfimationDialogComponent} from 'src/app/shared/confimation-dialog/confimation-dialog.component'
import {MatDialog, MatDialogRef} from '@angular/material';
import { MatTabGroup } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';
import { TableDumpComponent } from './table-dump/table-dumb.component';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  @ViewChild(TableDumpComponent) tableComp: TableDumpComponent;
  nodedata: any[];
  dialogueRef: MatDialogRef<ConfimationDialogComponent>;
  private stompClient = null;
  username:any = "u"+(Math.random()*6)+1;
  greetings: string[] = [];
  
  constructor(private testService : TestService, public dialog: MatDialog, private spinner: NgxSpinnerService) { }
  
  ngOnInit() {
   //
  }

  setConnected(connected: boolean) {
    // this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  showGreeting(message) {
    this.greetings.push(message);
  }

 

  dispatchTabChangeEvent(index){
    this.tabGroup.selectedIndex = index;
  }

  exportToCsv(){
    new Angular5Csv(this.tableComp.dataSource, 'My Report');
  }

  postNodeValue(testnodes): void{
    // this.spinner.show();
    this.tabGroup.selectedIndex = 1;
    testnodes.userName = this.username;
    this.testService.postTestValues(testnodes).subscribe((data: any) => {
      this.nodedata= data.results;
      console.log(this.nodedata);
      if(data.success === true) {
        // this.spinner.hide();
        // this.dialogueRef = this.dialog.open( ConfimationDialogComponent , {
        //   width: '700px',
        // });
        //   this.dialogueRef.afterClosed().subscribe(index => {
        //   this.tabGroup.selectedIndex = index;
        // });
      }
    }, error =>{
      // this.spinner.hide();
      const dialogRef = this.dialog.open( ErrorMsgComponent , {
        width: '700px',
      });
      dialogRef.afterClosed().subscribe(isTryagain => {
        if(isTryagain == true) {
          this.postNodeValue(testnodes);
        }
      });
    });
  }
}
