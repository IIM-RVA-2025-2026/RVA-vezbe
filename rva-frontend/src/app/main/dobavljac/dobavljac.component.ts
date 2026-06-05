import { DobavljacDialogComponent } from './../../dialogs/dobavljac-dialog/dobavljac-dialog.component';
import { DobavljacService } from './../../services/dobavljac.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Dobavljac } from '../../models/dobavljac';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dobavljac',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatToolbarModule],
  templateUrl: './dobavljac.component.html',
  styleUrl: './dobavljac.component.css'
})
export class DobavljacComponent implements OnInit{

  displayedColumns = ['id', 'naziv', 'adresa', 'kontakt', 'actions'];
  dataSource:MatTableDataSource<Dobavljac> = new MatTableDataSource<Dobavljac>;

  constructor(private service:DobavljacService, private dialog:MatDialog) {}
  
  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.service.getAllDobavljacs().subscribe(
      {next: (data) => { this.dataSource.data = data },
      error: (err) => console.log(err)}
    )
  }

  public openDialog(flag:number, id?:number, naziv?:string, adresa?:string, kontakt?:string):void {
    const ref = this.dialog.open(DobavljacDialogComponent, {data: {id, naziv, adresa, kontakt}});
    ref.componentInstance.flag = flag;
    ref.afterClosed().subscribe(
      (response) => {
        this.loadData();
      }
    )
  }

}
