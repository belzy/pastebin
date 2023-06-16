import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
const { SERVER_URL, PRODUCTION } = environment;

export interface DialogData {
  id: string
}

@Component({
  selector: 'app-bin-url-dialog',
  template: `
    <div style="padding: 8px;">
      <h2>PasteBin Created!</h2>
      <h3 style="text-align: center;">Your PasteBin URL:</h3>
      <p style="text-align: center;">{{ origin }}/{{ data.id }}</p> `,
})
export class BinUrlDialog {
  constructor(
    public dialogRef: MatDialogRef<BinUrlDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    origin = window.location.origin;

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog) { }

  editorContent = new FormControl('');

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(BinUrlDialog, {
      height: '400px',
      width: '600px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    })
  }

  handleSubmit(): void {
    try {
      this.http.post<{ id: string }>(SERVER_URL, {
        content: this.editorContent.value,
      }, {
        responseType: 'json'
      }).subscribe((response) => {
        this.openDialog(response.id);
      });

    } catch (error) {
      console.log(error);
    }
  }
}
