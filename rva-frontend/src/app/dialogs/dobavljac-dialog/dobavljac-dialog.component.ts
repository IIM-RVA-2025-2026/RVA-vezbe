import { DobavljacService } from './../../services/dobavljac.service';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from '../../models/dobavljac';

@Component({
  selector: 'app-dobavljac-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './dobavljac-dialog.component.html',
  styleUrl: './dobavljac-dialog.component.css'
})
export class DobavljacDialogComponent {
  flag!:number;

  constructor(private service:DobavljacService,
    private snackBar:MatSnackBar,
    private dialogRef:MatDialogRef<DobavljacDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Dobavljac
  ) {}

  
  public add(): void {
    this.data.id = 0;
    this.service.createDobavljac(this.data).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Dobavljač je uspešno kreiran.`, `OK`, {duration:4000});
      },
      error: (err) => {
        console.log(err);
        console.log(this.data);
        this.snackBar.open(`Neuspešno izvršavanje ove aktivnosti.`), `OK`, {duration:4000};
      }
    })
  }

  public update(): void {
    this.service.updateDobavljac(this.data).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Dobavljač je uspešno izmenjen.`, `OK`, {duration:4000});
      },
      error: (err) => {
        console.log(err);
        this.snackBar.open(`Neuspešno izvršavanje ove aktivnosti.`, `OK`, {duration:4000});
      }
    })
  }

  public delete(): void {
    this.service.deleteDobavljac(this.data.id).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Dobavljač je uspešno obrisan.`, `OK`, {duration:4000});
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
