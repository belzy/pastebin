import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const { SERVER_URL } = environment;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

    expiration: string | null = null;
    data: any = {
      title: '',
      content: '',
      expiration: 0,
    };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.http.get<any>(`${ SERVER_URL }/bin/${ params['id'] }`)
        .subscribe((data) => {

          if (data.expired) {
            this.router.navigate(['/']);
          } else {
            this.data = data;

            if (data.expiration) {
              setInterval(() => {
                this.expiration = this.formatExpiration(this.data.expiration);

                if (this.data.expiration <= Date.now())
                  this.router.navigate(['/']);
              }, 1000);
            }
          }
        });
    });
  }

  formatExpiration(expiration: number): string {
    const timeInMs = expiration - Date.now();

    // Milliseconds per time period
    const yearInMs = 3.154e+10;
    const monthInMs = 2.628e+9;
    const dayInMs = 8.64e+7;
    const hourInMs = 3.6e+6;
    const minuteInMs = 60000;
    const secondInMs = 1000;

    let time;
    if ((time = timeInMs / yearInMs) >= 1) {
      return `${ Math.floor(time).toString() } Year(s)`;
    } else if ((time = timeInMs / monthInMs) >= 1) {
      return `${ Math.floor(time).toString() } Month(s)`;
    } else if ((time = timeInMs / dayInMs) >= 1) {
      return `${ Math.floor(time).toString() } Day(s)`;
    } else if ((time = timeInMs / hourInMs) >= 1) {
      return `${ Math.floor(time).toString() } Hour(s)`;
    } else if ((time = timeInMs / minuteInMs) >= 1) {
      return `${ Math.floor(time).toString() } Minutes(s)`;
    } else if ((time = timeInMs / secondInMs) >= 1) {
      return `${ Math.floor(time).toString() } Second(s)`;
    } else {
      return '0 Second(s)'
    }
  }
}
