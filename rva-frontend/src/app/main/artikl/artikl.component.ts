import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Artikl } from '../../models/artikl';
import { ArtiklService } from '../../services/artikl.service';

@Component({
  selector: 'app-artikl',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artikl.component.html',
  styleUrl: './artikl.component.css'
})
export class ArtiklComponent implements OnInit{

  artikls:Artikl[] = [];

  constructor(private service:ArtiklService) {}

  ngOnInit(): void {
    this.service.getAllArtikls().subscribe({
      next: (data) => {
        this.artikls = data;
      },
      error:(err) => console.log(err)
    })
  }


}
