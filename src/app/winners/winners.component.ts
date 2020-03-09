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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: LotteryFormsService) { }

  ngOnInit() {
    this.winners$ = this.service.winners$;
    this.winners$.pipe(takeUntil(this.destroy$))
    .subscribe(winners => {
      console.log(winners);
      this.dataSource = new MatTableDataSource(winners);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
