import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Candidate } from '../model/candidate';
import { WinnersService } from '../services/winners.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css'],
})
export class WinnersComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  winners: Candidate[] = [];
  displayedColumns: string[] = ['number', 'identifier'];
  dataSource!: MatTableDataSource<Candidate>;
  private paginator!: MatPaginator;
  private sort!: MatSort;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  constructor(
    private service: WinnersService,
    private dialogRef: MatDialogRef<WinnersComponent>,
    @Inject(MAT_DIALOG_DATA) data: Candidate[],
  ) {
    this.winners = data;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Candidate>(this.winners);
  }

  close(): void {
    this.dialogRef.close();
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
