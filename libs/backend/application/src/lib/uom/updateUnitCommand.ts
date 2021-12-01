import { UnitsInListDto } from "@maybert/api-dtos";
import { ActivityType, IUser } from "@maybert/backend/domain";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ActivityLogRepository, IUnit, UnitsRepository } from "@maybert/backend/persistence";
import { getEmployeeFullName } from "@maybert/backend/common";
import { NotFoundException } from "@nestjs/common";

export class UpdateUnitCommand {
  constructor(public payload: UnitsInListDto, public user: IUser) {}
}

@CommandHandler(UpdateUnitCommand)
export class UpdateUnitCommandHandler implements ICommandHandler<UpdateUnitCommand>{
  constructor(public repo: UnitsRepository, private activityRepo: ActivityLogRepository) {

  }

  async execute(command: UpdateUnitCommand): Promise<any> {
    console.log('payload', command.payload)
    const existing = await this.repo.getById(command.payload._id);

    if(!existing){
      throw new NotFoundException('Selected unit cannot be found');
    }

    return this.repo.update(command.payload._id,{
      name: command.payload.name
    }).then((async unit => {
      await this.recordActivity(existing,unit, command.user);
    }));
  }

  async recordActivity(existing:IUnit, unit: IUnit, user:IUser){

    const {firstName,middleName, surname} = user._employee;
    const employeeName = getEmployeeFullName(firstName,middleName, surname)

    return this.activityRepo.persist({
      formattedContent: `<strong>${employeeName}</strong> changed <strong>${existing.name}</strong> unit of measurement to  <strong>${unit.name}</strong>`,
      departmentId: user._employee._currentJobStatus._jobAnalysis.departmentId,
      type: ActivityType.Update,
      employeeId: user.employeeId,
      userId: user._id,
    })
  }

}
