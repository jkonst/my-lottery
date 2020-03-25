import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LotteryFormsService } from '../lottery-forms/lottery-forms.service';
import { Candidate } from '../model/candidate';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();
  winners$: Observable<Candidate[]>;
  displayedColumns: string[] = ['number', 'identifier'];
  dataSource: MatTableDataSource<Candidate>;
  private paginator: MatPaginator;
  private sort: MatSort;

  // see: https://github.com/angular/components/issues/10205
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) set  matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  constructor(private service: LotteryFormsService) { }

  ngOnInit() {
    this.winners$ = this.service.winners$;
    this.winners$.pipe(takeUntil(this.destroy$))
    .subscribe(winners => {
      this.dataSource = new MatTableDataSource(winners);
    });
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
