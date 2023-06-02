import { Component, OnInit } from '@angular/core';
import { Ad } from '../ad';
import { AdService } from '../ad.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  formGroupAdmin: FormGroup;
  ads: Ad[] = [];
  isEditing: boolean = false;
  submitted: boolean = false;
  statusOption: string[] = ['Ativo', 'Desativo'];

  constructor(private adService: AdService, private formBuilder: FormBuilder, private router: Router) {
    this.formGroupAdmin = formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      expirationDate: ['', Validators.required],
      image: ['', Validators.required],
      status: [false],
    });
  }
  ngOnInit(): void {
    this.loadAds();
  }

  loadAds() {
    this.adService.getAds().subscribe({
      next: (data) => (this.ads = data),
    });
  }

  save() {
    this.submitted = true;
    if(this.formGroupAdmin.valid){
      if (this.isEditing) {
        this.adService.update(this.formGroupAdmin.value).subscribe({
          next: () => {
            this.loadAds();
            this.formGroupAdmin.reset();
            this.isEditing = false;
            this.submitted = false;
          }
        });
      } else {
        this.adService.save(this.formGroupAdmin.value).subscribe({
          next: data => {
            this.ads.push(data)
            this.formGroupAdmin.reset();
            this.submitted = false;
          }
         });
      }
    }
  }

  clean(){
    this.formGroupAdmin.reset();
    this.isEditing = false;
    this.submitted = false;
  }

  edit(ad: Ad) {
    this.formGroupAdmin.patchValue(ad);
    this.isEditing = true;
  }

  remove(ad: Ad) {
    this.adService.delete(ad).subscribe({
      next: () => this.loadAds(),
    });
  }

  get title() : any {
    return this.formGroupAdmin.get("title");
  }

  get description() : any {
    return this.formGroupAdmin.get("description");
  }

  get price() : any {
    return this.formGroupAdmin.get("price");
  }

  get data() : any {
    return this.formGroupAdmin.get("expirationDate");
  }

  get image() : any {
    return this.formGroupAdmin.get("image");
  }
}
