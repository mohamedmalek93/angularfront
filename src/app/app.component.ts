import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open( DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'app-dialog-content-example-dialog',
})
export class DialogContentExampleDialogComponent {}
