import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ad } from '../ad.model';
import { AdService } from '../ad.service';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.css']
})
export class AdFormComponent implements OnInit {
  @Input() ad: Ad = new Ad();

  constructor(private adService: AdService) { }

  ngOnInit(): void {
  }

  saveAd(): void {
    if (this.ad.id) {
      // Editar anúncio existente
      this.adService.updateAd(this.ad).subscribe(() => {
        console.log('Anúncio atualizado com sucesso!');
      });
    } else {
      // Cadastrar novo anúncio
      this.adService.createAd(this.ad).subscribe(() => {
        console.log('Novo anúncio cadastrado com sucesso!');
      });
    }
  }
}
