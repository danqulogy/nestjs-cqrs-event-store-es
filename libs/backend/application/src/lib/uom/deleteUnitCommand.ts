// import { ActivityType, IUser } from "@maybert/backend/domain";
// import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
// import { ActivityLogRepository, IUnit, UnitsRepository } from "@maybert/backend/persistence";
// import { NotFoundException } from "@nestjs/common";
// import { getEmployeeFullName } from "@maybert/backend/common";
//
// export class DeleteUnitCommand {
//   constructor(public id: string, public user: IUser) {
//
//   }
//
// }
//
// @CommandHandler(DeleteUnitCommand)
// export class DeleteUnitCommandHandler implements ICommandHandler<DeleteUnitCommand>{
//   constructor(public repo: UnitsRepository, private activityRepo: ActivityLogRepository) {
//
//   }
//
//   async execute(command: DeleteUnitCommand): Promise<any> {
//     const existing = await this.repo.getById(command.id);
//
//     if(!existing){
//       throw new NotFoundException('Selected unit cannot be found');
//     }
//
//     return this.repo.delete(command.id).then((async unit => {
//       await this.recordActivity(existing, command.user);
//     }));
//   }
//
//   async recordActivity(existing:IUnit,  user:IUser){
//
//     const {firstName,middleName, surname} = user._employee;
//     const employeeName = getEmployeeFullName(firstName,middleName, surname)
//
//     return this.activityRepo.persist({
//       formattedContent: `<strong>${employeeName}</strong> deleted <strong>${existing.name}</strong> unit of measure`,
//       departmentId: user._employee._currentJobStatus._jobAnalysis.departmentId,
//       type: ActivityType.Delete,
//       employeeId: user.employeeId,
//       userId: user._id,
//     })
//   }
//
// }
