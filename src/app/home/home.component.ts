import { Component, OnInit } from '@angular/core';
import { Ad } from '../ad';
import { AdService } from '../ad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ads: Ad[] = [];

  constructor(private adService: AdService) { }

  ngOnInit(): void {
    this.loadAds();
  }

  loadAds(): void {
    this.adService.getActiveAds().subscribe((ads) => {
      this.ads = ads;
    });
  }
}

