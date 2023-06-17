import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private http: HttpClient) { }

    content: any = {
      content: 'Test Content',
    };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);

      this.http.get<any>(`${ SERVER_URL }/bin/${ params['id'] }`)
        .subscribe(({ content }) => {
          console.log(content);

          this.content = content;
        });
    });
  }
}
