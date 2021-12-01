import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { RequisitionInListDto } from "@fom/shared/api-dtos";
import {  RequisitionsService } from "../state/ENG/requisitions";
import { from, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({ providedIn: 'any' })
export class ProjectRequisitionResolver implements Resolve<RequisitionInListDto | boolean> {
  constructor(
    private requisitionsService: RequisitionsService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<RequisitionInListDto | boolean> {
    if (!route.paramMap.has('id')) {
      return from(this.router.navigate(['/exceptions/404']));
    }
    const param = route.params['id'];

    this.requisitionsService
      .get()
      .pipe(
        tap((data) => {
          const ledger = data.find((d) => d._id === param);
          if (ledger) {
            this.requisitionsService.setActive(ledger._id);
          }
        })
      )
      .subscribe();

    return this.requisitionsService
      .getRequisitionById(param)
      .pipe(catchError(() => from(this.router.navigate(['/exceptions/404']))));
  }
}
