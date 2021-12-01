// import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
// import { ActivityLogRepository, IUnit, UnitsRepository } from "@maybert/backend/persistence";
// import { getEmployeeFullName } from "@maybert/backend/common";
//
// export class AddUnitCommand {
//   constructor(public payload: AddUnitDto, public user: IUser) {
//
//   }
//
// }
//
// @CommandHandler(AddUnitCommand)
// export class AddUnitCommandHandler implements ICommandHandler<AddUnitCommand>{
//
//   constructor(public repo: UnitsRepository, private activityRepo: ActivityLogRepository) {
//
//   }
//
//   execute(command: AddUnitCommand): Promise<any> {
//     return this.repo.create({
//       name: command.payload.name
//     }).then((async unit => {
//       await this.recordActivity(unit, command.user);
//     }));
//   }
//
//   async recordActivity(unit: IUnit, user:IUser){
//
//     const {firstName,middleName, surname} = user._employee;
//     const employeeName = getEmployeeFullName(firstName,middleName, surname)
//
//       return this.activityRepo.persist({
//         content: `${employeeName} added ${unit.name} unit of measurement`,
//         formattedContent: `<strong>${employeeName}</strong> added <strong>${unit.name}</strong> unit of measurement`,
//         departmentId: user._employee._currentJobStatus._jobAnalysis.departmentId,
//         type: ActivityType.Create,
//         employeeId: user.employeeId,
//         userId: user._id,
//
//       })
//   }
//
// }
