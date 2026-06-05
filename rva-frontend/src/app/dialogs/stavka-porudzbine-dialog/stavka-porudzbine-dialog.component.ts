import { MatSelectModule } from '@angular/material/select';
import { ArtiklService } from './../../services/artikl.service';
import { StavkaPorudzbine } from './../../models/stavka-porudzbine';
import { StavkaPorudzbineService } from './../../services/stavka-porudzbine.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Artikl } from '../../models/artikl';

@Component({
  selector: 'app-stavka-porudzbine-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './stavka-porudzbine-dialog.component.html',
  styleUrl: './stavka-porudzbine-dialog.component.css'
})
export class StavkaPorudzbineDialogComponent implements OnInit{
  flag!:number;
  artikli:Artikl[] = [];

  constructor(private service:StavkaPorudzbineService,
    private snackBar:MatSnackBar,
    private dialogRef:MatDialogRef<StavkaPorudzbineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:StavkaPorudzbine,
    private artiklService:ArtiklService
  ) {}

  ngOnInit(): void {
    this.artiklService.getAllArtikls().subscribe(
      (data) => this.artikli = data
    )
  }

  public compare(a:any, b:any) {
    return a.id == b.id;
  }

  
  public add(): void {
    this.data.id = 0;
    console.log(this.data);
    this.service.createStavkaPorudzbine(this.data).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Stavka porudžbine je uspešno kreirana.`, `OK`, {duration:4000});
      },
      error: (err) => {
        console.log(err);
        console.log(this.data);
        this.snackBar.open(`Neuspešno izvršavanje ove aktivnosti.`), `OK`, {duration:4000};
      }
    })
  }

  public update(): void {
    this.service.updateStavkaPorudzbine(this.data).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Stavka porudžbine je uspešno izmenjena.`, `OK`, {duration:4000});
      },
      error: (err) => {
        console.log(err);
        this.snackBar.open(`Neuspešno izvršavanje ove aktivnosti.`, `OK`, {duration:4000});
      }
    })
  }

  public delete(): void {
    this.service.deleteStavkaPorudzbine(this.data.id).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Stavka porudžbine je uspešno obrisana.`, `OK`, {duration:4000});
      },
      error: (err) => {
        console.log(err);
        
        this.snackBar.open(`Neuspešno izvršavanje ove aktivnosti.`, `OK`, {duration:4000});
      }
    })
  }

  public cancel(): void {
    this.dialogRef.close(1);
    this.snackBar.open(`Uspešno zatvoren dijalog`, `OK`, {duration:4000});
  }
}
