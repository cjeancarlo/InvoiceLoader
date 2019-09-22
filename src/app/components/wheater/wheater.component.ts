import { Component, OnInit } from '@angular/core';
import { WheaterService } from 'src/app/services/wheater.service';

@Component({
  selector: 'app-wheater',
  templateUrl: './wheater.component.html',
  styleUrls: ['./wheater.component.scss']
})
export class WheaterComponent implements OnInit {

  
  constructor(private  _wheaterService :WheaterService ) { 

   
  }

  ngOnInit() {

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          this._wheaterService.getWeather(position.coords);
      });
  } else {
      console.error("The browser does not support geolocation...");
  }
  }

}
