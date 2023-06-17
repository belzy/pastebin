import { Inject, Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';

export interface DialogData {
  id: string
}

@Component({
  selector: 'app-bin-url-dialog',
  templateUrl: './bin-url-dialog.component.html',
  styleUrls: ['./bin-url-dialog.component.scss'],
})
export class UrlDialogComponent implements AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<UrlDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    origin = window.location.origin;

    @ViewChild('urlInput')
    urlInput!: ElementRef;

  ngAfterViewInit(): void {
    this.selectText();
  }

  selectText(): void {
    this.urlInput.nativeElement.select();
  }

  async writeUrlToClipboard(): Promise<any> {
    await navigator.clipboard.writeText(this.urlInput.nativeElement.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
