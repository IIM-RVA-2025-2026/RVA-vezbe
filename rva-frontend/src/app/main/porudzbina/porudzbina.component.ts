import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { StavkaPorudzbineComponent } from './../stavka-porudzbine/stavka-porudzbine.component';
import { PorudzbinaDialogComponent } from './../../dialogs/porudzbina-dialog/porudzbina-dialog.component';
import { Dobavljac } from './../../models/dobavljac';
import { PorudzbinaService } from './../../services/porudzbina.service';
import { MatDialog } from '@angular/material/dialog';
import { Porudzbina } from './../../models/porudzbina';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-porudzbina',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatToolbarModule, StavkaPorudzbineComponent, MatSortModule, MatPaginatorModule],
  templateUrl: './porudzbina.component.html',
  styleUrl: './porudzbina.component.css'
})
export class PorudzbinaComponent implements OnInit, AfterViewInit{
  displayedColumns = ['id', 'datumPorudzbine', 'datumIsporuke', 'placeno', 'iznos', 'dobavljac', 'actions'];
  dataSource:MatTableDataSource<Porudzbina> = new MatTableDataSource<Porudzbina>;

  parentSelectedPorudzbina!:Porudzbina;

  constructor(private service:PorudzbinaService, private dialog:MatDialog){}

  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
  }

}
