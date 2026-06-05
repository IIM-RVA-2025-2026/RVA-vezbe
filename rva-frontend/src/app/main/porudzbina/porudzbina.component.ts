import { StavkaPorudzbineComponent } from './../stavka-porudzbine/stavka-porudzbine.component';
import { PorudzbinaDialogComponent } from './../../dialogs/porudzbina-dialog/porudzbina-dialog.component';
import { Dobavljac } from './../../models/dobavljac';
import { PorudzbinaService } from './../../services/porudzbina.service';
import { MatDialog } from '@angular/material/dialog';
import { Porudzbina } from './../../models/porudzbina';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-porudzbina',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatToolbarModule, StavkaPorudzbineComponent],
  templateUrl: './porudzbina.component.html',
  styleUrl: './porudzbina.component.css'
})
export class PorudzbinaComponent implements OnInit{
  displayedColumns = ['id', 'datumPorudzbine', 'datumIsporuke', 'placeno', 'iznos', 'dobavljac', 'actions'];
  dataSource:MatTableDataSource<Porudzbina> = new MatTableDataSource<Porudzbina>;

  parentSelectedPorudzbina!:Porudzbina;

  constructor(private service:PorudzbinaService, private dialog:MatDialog){}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.service.getAllPorudzbinas().subscribe({
      next: (data) => { this.dataSource.data = data },
      error: (err) => console.log(err)
    })
  }

  public openDialog(flag:number, id?:number, datumPorudzbine?:Date, datumIsporuke?:Date, placeno?:boolean, iznos?:number, dobavljac?:Dobavljac) {
    const ref = this.dialog.open(PorudzbinaDialogComponent, {data: {id, datumPorudzbine, datumIsporuke, placeno, iznos, dobavljac}});
    ref.componentInstance.flag = flag;
    ref.afterClosed().subscribe(
      (response) => {
        this.loadData();
      }
    )
  }

  public selectRow(row:Porudzbina){
    this.parentSelectedPorudzbina = row;
    console.log(row);
  }

}
