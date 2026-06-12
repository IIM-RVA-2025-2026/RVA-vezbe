import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { StavkaPorudzbineDialogComponent } from './../../dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StavkaPorudzbineService } from './../../services/stavka-porudzbine.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Porudzbina } from '../../models/porudzbina';
import { StavkaPorudzbine } from '../../models/stavka-porudzbine';
import { Artikl } from '../../models/artikl';

@Component({
  selector: 'app-stavka-porudzbine',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatToolbarModule, MatSortModule, MatPaginatorModule],
  templateUrl: './stavka-porudzbine.component.html',
  styleUrl: './stavka-porudzbine.component.css'
})
export class StavkaPorudzbineComponent implements OnInit, OnChanges, AfterViewInit{

  displayedColumns = ['id', 'redniBroj', 'kolicina', 'jedinicaMere', 'cena', 'artikl', 'actions'];
  dataSource:MatTableDataSource<StavkaPorudzbine> = new MatTableDataSource<StavkaPorudzbine>;

  @Input()
  childSelectedPorudzbina!:Porudzbina;

  constructor(private service:StavkaPorudzbineService, private dialog:MatDialog) {}
  
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  ngOnInit(): void {
    this.loadData();
  }
 
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public loadData():void {
    this.service.getAllStavkeByPorudzbina(this.childSelectedPorudzbina.id).subscribe(
      {next: (data) => { this.dataSource.data = data },
      error: (err) => console.log(err)}
    )
  }

  public openDialog(flag:number, id?:number, redniBroj?:number, kolicina?:number, jedinicaMere?:string, cena?:number, artikl?:Artikl) {
    const ref = this.dialog.open(StavkaPorudzbineDialogComponent, {data: {id, redniBroj, kolicina, jedinicaMere, cena, artikl}});
    ref.componentInstance.flag = flag;
    ref.componentInstance.data.porudzbina = this.childSelectedPorudzbina;
    ref.afterClosed().subscribe(
      (response) => {
        this.loadData();
      }
    )
  }

}
