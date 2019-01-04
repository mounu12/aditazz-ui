import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import {ConfimationDialogComponent} from 'src/app/shared/confimation-dialog/confimation-dialog.component'
import {MatDialog, MatDialogRef} from '@angular/material';
import { MatTabGroup } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  nodedata: any[];
  dialogueRef: MatDialogRef<ConfimationDialogComponent>;
  private stompClient = null;
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

  postNodeValue(testnodes): void{
    // this.spinner.show();
    this.tabGroup.selectedIndex = 1;
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
