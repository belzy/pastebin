import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { UrlDialogComponent } from '../url-dialog/bin-url-dialog.component';
const { SERVER_URL, PRODUCTION } = environment;

enum Expiration {
  MINUTES_1 = '1 Minute',
  MINUTES_5 = '5 Minutes',
  MINUTES_10 = '10 Minutes',
  MINUTES_30 = '30 Minutes',
  HOUR = '1 Hour',
  DAY = '1 Day',
  WEEK = '1 Week',
  MONTH = '1 Month',
  YEAR = '1 Year',
  NEVER = 'Never',
  CUSTOM = 'Custom',
}

enum Time {
  MINUTES_1 = 60000,
  MINUTES_5 = 300000,
  MINUTES_10 = 600000,
  MINUTES_30 = 1.8e+6,
  HOUR = 3.6e+6,
  DAY = 8.64e+7,
  WEEK = 6.048e+8,
  MONTH = 2.628e+9,
  YEAR = 3.154e+10,
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private route: ActivatedRoute) { }

  title: FormControl = new FormControl('');
  editorContent = new FormControl('');
  expirationText: Expiration = Expiration.WEEK;
  expirationValue: number | null = Date.now() + Time.WEEK;

  handleExpirationClick(expiration: string): void {
    switch (expiration) {
      default:
      case Expiration.MINUTES_1:
        this.expirationText = Expiration.MINUTES_1;
        this.expirationValue = Date.now() + Time.MINUTES_1
        break;
      case Expiration.MINUTES_5:
        this.expirationText = Expiration.MINUTES_5;
        this.expirationValue = Date.now() + Time.MINUTES_5
        break;
      case Expiration.MINUTES_10:
        this.expirationText = Expiration.MINUTES_10;
        this.expirationValue = Date.now() + Time.MINUTES_10
        break;
      case Expiration.MINUTES_30:
        this.expirationText = Expiration.MINUTES_30;
        this.expirationValue = Date.now() + Time.MINUTES_30
        break;
      case Expiration.HOUR:
        this.expirationText = Expiration.HOUR;
        this.expirationValue = Date.now() + Time.HOUR
        break;
      case Expiration.DAY:
        this.expirationText = Expiration.DAY;
        this.expirationValue = Date.now() + Time.DAY
        break;
      case Expiration.WEEK:
        this.expirationText = Expiration.WEEK;
        this.expirationValue = Date.now() + Time.WEEK
        break;
      case Expiration.MONTH:
        this.expirationText = Expiration.MONTH;
        this.expirationValue = Date.now() + Time.MONTH
        break;
      case Expiration.YEAR:
        this.expirationText = Expiration.YEAR;
        this.expirationValue = Date.now() + Time.YEAR
        break;
      case Expiration.NEVER:
        this.expirationText = Expiration.NEVER;
        this.expirationValue = null;
        break;
      case Expiration.CUSTOM:
        this.expirationText = Expiration.CUSTOM;
        this.expirationValue = 0;
        break;
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
    });
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(UrlDialogComponent, {
      height: '400px',
      width: '600px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Your code here...
    })
  }

  handleSubmit(): void {
    try {
      this.http.post<{ id: string }>(`${ SERVER_URL }/bin`, {
        title: this.title.value === '' ? 'No Title' : this.title.value,
        content: this.editorContent.value,
        expiration: this.expirationValue,
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
