import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Artikl } from '../../models/artikl';
import { ArtiklService } from '../../services/artikl.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { ArtiklDialogComponent } from '../../dialogs/artikl-dialog/artikl-dialog.component';

@Component({
  selector: 'app-artikl',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatToolbarModule],
  templateUrl: './artikl.component.html',
  styleUrl: './artikl.component.css'
})
export class ArtiklComponent implements OnInit{

  //artikls:Artikl[] = [];
  dataSource:MatTableDataSource<Artikl> = new MatTableDataSource<Artikl>;
  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];

  constructor(private service:ArtiklService, private dialog:MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData():void {
    this.service.getAllArtikls().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error:(err) => console.log(err)
    })
  }

  public openDialog(flag:number, id?:number, naziv?:string, proizvodjac?:string): void {
    const ref = this.dialog.open(ArtiklDialogComponent, {data:{id, naziv, proizvodjac}});
    ref.componentInstance.flag = flag;
    ref.afterClosed().subscribe(
      (response) => {
          this.loadData();
      }
    )
  }

}
