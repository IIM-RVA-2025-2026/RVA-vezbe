import { DobavljacService } from './../../services/dobavljac.service';
import { PorudzbinaService } from './../../services/porudzbina.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Porudzbina } from '../../models/porudzbina';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Dobavljac } from '../../models/dobavljac';

@Component({
  selector: 'app-porudzbina-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './porudzbina-dialog.component.html',
  styleUrl: './porudzbina-dialog.component.css'
})
export class PorudzbinaDialogComponent implements OnInit{
  flag!:number;
  dobavljaci:Dobavljac[] = [];

  constructor(private service:PorudzbinaService,
    private snackBar:MatSnackBar,
    private dialogRef:MatDialogRef<PorudzbinaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Porudzbina,
    private dobavljacService:DobavljacService
  ) {}

  ngOnInit(): void {
    this.dobavljacService.getAllDobavljacs().subscribe(
      (data) => this.dobavljaci = data
    )
  }

  public compare(a:any, b:any) {
    return a.id == b.id;
  }

  
  public add(): void {
    this.data.id = 0;
    this.service.createPorudzbina(this.data).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Porudžbina je uspešno kreirana.`, `OK`, {duration:4000});
      },
      error: (err) => {
        console.log(err);
        console.log(this.data);
        this.snackBar.open(`Neuspešno izvršavanje ove aktivnosti.`), `OK`, {duration:4000};
      }
    })
  }

  public update(): void {
    this.service.updatePorudzbina(this.data).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Porudžbina je uspešno izmenjena.`, `OK`, {duration:4000});
      },
      error: (err) => {
        console.log(err);
        this.snackBar.open(`Neuspešno izvršavanje ove aktivnosti.`, `OK`, {duration:4000});
      }
    })
  }

  public delete(): void {
    this.service.deletePorudzbina(this.data.id).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Porudžbina je uspešno obrisan.`, `OK`, {duration:4000});
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
