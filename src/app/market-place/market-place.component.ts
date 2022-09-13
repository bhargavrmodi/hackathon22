import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {

  public availablePoints: number = 0;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
   }

  ngOnInit() {
    this.http.get('https://footlose-backend.azurewebsites.net/dashboard', {
      params: {
        userId: 'test11',
        month: '10',
        year: '2019'
      }
    }).subscribe((response: any) => {
      this.availablePoints = response.karmaPoints;
    });
  }

  public buyProduct(pointsToBuy: number, description: string) {
    if(this.availablePoints-pointsToBuy < 0) {
      this.snackBar.open("Sorry, You can't place this order. Earn " + (pointsToBuy-this.availablePoints) +
        " more karma points to buy this product.", null , {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['style-error']
      });
    } else {
      let postResponse = this.http.post('https://footlose-backend.azurewebsites.net/karma/123', {
          karmaPoints: pointsToBuy,
          mode: 'reduction',
          userId: 'test11',
          description
      }).subscribe(res=> {
        console.log("response ", res);
      });
      this.availablePoints-=pointsToBuy;
      this.snackBar.open("Thanks for ordering the product. It will get delivered to you in 4-5 working days.Your karma points have been updated.", null , {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['style-succes']
      });
    }
  }

  public donatePoints(pointsToDonate: number, description: string) {
    if(this.availablePoints-pointsToDonate < 0) {
      this.snackBar.open("Sorry, You can't donate for this organisation. Earn " + (pointsToDonate-this.availablePoints) +
        " more karma points to donate for this project.", null , {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['style-error']
      });
    } else {
      let postResponse = this.http.post<any>('https://footlose-backend.azurewebsites.net/karma/123', {
        karmaPoints: pointsToDonate,
        mode: 'reduction',
        userId: 'test11',
        description,
      }).subscribe(res => {
        console.log("response ", res);
      });
      this.availablePoints-=pointsToDonate;
      this.snackBar.open("Thanks for donating " + pointsToDonate +  " points. Your karma points have been updated.", null , {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['style-succes']
      });
    }
  }

}
