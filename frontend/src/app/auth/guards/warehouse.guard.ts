import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

import {
  DataStoredInToken,
  SessionService,
} from './../../common/services/session.service';

import { EmployeeTitleEnum } from './../../employee/employee.enum';

@Injectable({
  providedIn: 'root',
})
export class WarehouseGuard implements CanActivate {
  session: DataStoredInToken;

  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    this.session = this.sessionService.decodeSession();
    if (this.session.title === EmployeeTitleEnum.WAREHOUSE) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }
}
