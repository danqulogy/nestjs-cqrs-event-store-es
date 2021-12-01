import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HrManagerMenu } from "./hr/hr-manager-menu";
import { SecretaryMenu } from "./hr/secretary-menu";
import { DepartmentNameEnum, SystemUserRole } from "@fom/shared/api-dtos";
import { AccountantMenu } from "./finance/accountant.menu";
import { AccountClerkMenu } from "./finance/account-clerk.menu";
import { StoresManagerMenu } from "./finance/stores-manager.menu";
import { SYSTEM_DEPARTMENT_NAME } from "../constants";

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  currentMenu = new BehaviorSubject<any[]>([]);

  constructor(@Inject(SYSTEM_DEPARTMENT_NAME) private department: DepartmentNameEnum|string) {}

  getMenuData(userRole: SystemUserRole|string): any[] {
    this.setMenuData(userRole);
    return this.currentMenu.value
  }

  private setMenuData(userRole: SystemUserRole|string) {

    console.log('setting menu for '+ this.department + ' department')
    switch (this.department) {
      case DepartmentNameEnum.HR_ADMINISTRATION:
        this.setHRPortalMenus(userRole);
        break;

      case DepartmentNameEnum.FINANCE:
        this.setFinancePortalMenus(userRole);
        break;
    }

  }

  setHRPortalMenus(userRole: SystemUserRole|string){
    switch (userRole) {
      // case SystemUserRole.HR_MANAGER:
      //   this.currentMenu.next(HrManagerMenu);
      //   break;
      //
      // case SystemUserRole.SECRETARY:
      //   this.currentMenu.next(SecretaryMenu);
      //   break;
      //
      // case SystemUserRole.DEVELOPER:
      //   this.currentMenu.next(HrManagerMenu);
      //   break;


    }
  }

  setFinancePortalMenus(userRole: SystemUserRole|string){
    // switch (userRole) {
    //   case SystemUserRole.ACCOUNTANT:
    //     this.currentMenu.next(AccountantMenu);
    //     break;
    //
    //   case SystemUserRole.ACCOUNTS_CLERK:
    //     this.currentMenu.next(AccountClerkMenu);
    //     break;
    //
    //   case SystemUserRole.STORES_MANAGER:
    //     this.currentMenu.next(StoresManagerMenu);
    //     break;
    //
    //   case SystemUserRole.DEVELOPER:
    //     this.currentMenu.next(AccountantMenu);
    //     break;
    // }
  }
}
