import { Component, OnInit } from '@angular/core';
import { Ad } from '../ad.model';
import { AdService } from '../ad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  ads: Ad[] = [];
  selectedAd: Ad = new Ad();
  isEditing: boolean = false;

  constructor(private adService: AdService, private router: Router) { }

  ngOnInit(): void {
    this.loadAds();
  }

  loadAds(): void {
    this.adService.getAllAds().subscribe((ads) => {
      this.ads = ads;
    });
  }

  editAd(ad: Ad): void {
    this.router.navigate(['/edit', ad.id]);
  }

  deleteAd(ad: Ad): void {
    this.adService.deleteAd(ad.id!).subscribe(() => {
      this.loadAds();
    });
  }

  saveAd(): void {
    if (this.selectedAd.id) {
      this.adService.updateAd(this.selectedAd).subscribe(() => {
        this.isEditing = false;
        this.selectedAd = new Ad();
        this.loadAds();
      });
    } else {
      this.adService.createAd(this.selectedAd).subscribe(() => {
        this.selectedAd = new Ad();
        this.loadAds();
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedAd = new Ad();
  }
}
