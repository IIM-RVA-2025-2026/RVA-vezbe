import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ArtiklService } from '../../services/artikl.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Artikl } from '../../models/artikl';

@Component({
  selector: 'app-artikl-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './artikl-dialog.component.html',
  styleUrl: './artikl-dialog.component.css'
})
export class ArtiklDialogComponent {
  flag!:number;

  constructor(private service:ArtiklService,
              private snackBar:MatSnackBar,
              private dialogRef:MatDialogRef<ArtiklDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:Artikl
    ) {}

  public add(): void {
    this.service.createArtikl(this.data).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Artikl je uspešno kreiran.`, `OK`, {duration:4000});
      },
      error: (err) => {
        console.log(err);
        console.log(this.data);
        this.snackBar.open(`Neuspešno izvršavanje ove aktivnosti.`), `OK`, {duration:4000};
      }
    })
  }

  public update(): void {
    this.service.updateArtikl(this.data).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Artikl je uspešno izmenjen.`, `OK`, {duration:4000});
      },
      error: (err) => {
        console.log(err);
        this.snackBar.open(`Neuspešno izvršavanje ove aktivnosti.`), `OK`, {duration:4000};
      }
    })
  }

  public delete(): void {
    this.service.deleteArtikl(this.data.id).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Artikl je uspešno obrisan.`, `OK`, {duration:4000});
      },
      error: (err) => {
        console.log(err);
        this.snackBar.open(`Neuspešno izvršavanje ove aktivnosti.`), `OK`, {duration:4000};
      }
    })
  }

  public cancel(): void {
    this.dialogRef.close(1);
    this.snackBar.open(`Uspešno zatvoren dijalog`, `OK`, {duration:4000});
  }

}
