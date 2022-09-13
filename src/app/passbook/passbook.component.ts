import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-list',
  templateUrl: './passbook.component.html',
  styleUrls: ['./passbook.component.css']
})
export class PassbookComponent implements OnInit {

  public listOfTransactions;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://footlose-backend.azurewebsites.net/karma/test11').subscribe(response => {
      this.listOfTransactions = response;
    })
  }

}
