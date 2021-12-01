import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { EnumToArray, GhanaRegionsEnum, SchoolEnrollmentStatus } from '@fom/shared/api-dtos';
import { FormBuilder, Validators } from '@angular/forms';
import { SchoolQuery, SchoolService, UsersQuery, UsersService } from '@fom/web/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FeMessagesService } from '@fom/web/shared/feature-notification';

@Component({
  selector: 'fom-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {


  schoolsLoading$ = this.schoolQuery.selectLoading();
  totalSchoolsCount$$ = new BehaviorSubject(0)
  totalDispatchedCount$$ = new BehaviorSubject(0)
  totalEnrolledCount$$ = new BehaviorSubject(0)
  totalPendingEnrollmentCount$ = new BehaviorSubject(0)
  totalUnEnrolled$$ = new BehaviorSubject(0)
  totalUsers$$ = new BehaviorSubject(0)


  users$ = this.usersQuery.selectAll().pipe(
    tap(data => {
      this.totalUsers$$.next(data.length)
    })
  )
  schools$ = this.schoolQuery.selectAll().pipe(
    tap(data => {
      const dispatched = data.filter(d => d.dispatched)
      const enrolled = data.filter(d => d.enrollmentStatus === SchoolEnrollmentStatus.ENROLLED)
      const notEnrolled = data.filter(d => d.enrollmentStatus === SchoolEnrollmentStatus.NOT_ENROLLED)
      const pending = data.filter(d => d.enrollmentStatus === SchoolEnrollmentStatus.PENDING)


      this.totalSchoolsCount$$.next(data.length)
      this.totalDispatchedCount$$.next(dispatched.length)
      this.totalEnrolledCount$$.next(enrolled.length)
      this.totalPendingEnrollmentCount$.next(pending.length)
      this.totalUnEnrolled$$.next(notEnrolled.length)

      const values = this.labels.map(l => {
        return data.filter(d => d.region === l).length
      })

      this.schoolByRegionsDistributionStats$$.next([...values])
    })
  )




  schoolByRegionsDistributionStats$$ = new BehaviorSubject([0,0])

  vm$ = combineLatest([this.schools$, this.users$])
  activeItemIndex: number | null = null;
  value = [13769, 12367];
  readonly labels = EnumToArray(GhanaRegionsEnum);
  showModal = false;



  constructor(private schoolService:SchoolService,
              private usersService: UsersService,
              private usersQuery: UsersQuery,
              private formBuilder: FormBuilder,
              private modal: NzModalService,
              private notification: NzNotificationService,
              private feMessageService: FeMessagesService,
              private schoolQuery: SchoolQuery) { }

  ngOnInit(): void {
    this.schoolService.getAllSchools().subscribe()
    this.usersService.getAllUsers().subscribe()

  }

  isItemActive(index: number): boolean {
    return this.activeItemIndex === index;
  }

  onHover(index: number, hovered: boolean) {
    this.activeItemIndex = hovered ? index : null;
  }

  getColor(index: number): string {
    return `var(--tui-chart-${index})`;
  }

  onClick(different: string) {
    console.log('jdkjkd')
  }




}
