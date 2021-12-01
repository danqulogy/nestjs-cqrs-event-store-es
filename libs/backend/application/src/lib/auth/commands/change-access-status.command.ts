import { ChangeAccessStatusDto, SystemUserRole } from "@fom/shared/api-dtos";
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ActivityLogRepository,
  UsersRepository
} from '@fom/backend/persistence';
import { ActivityType, IUser, User } from '@fom/backend/domain';
import { BadRequestException } from '@nestjs/common';
import { getEmployeeFullName } from "@fom/backend/common";

export class ChangeAccessStatusCommand {
  constructor(
    public readonly id: string,
    public readonly accessStatusDto: ChangeAccessStatusDto,
    public readonly admin: IUser
  ) {}
}

@CommandHandler(ChangeAccessStatusCommand)
export class ChangeAccessStatusCommandHandler
  implements ICommandHandler<ChangeAccessStatusCommand> {
  constructor(
    private readonly repository: UsersRepository,
    private activityLog: ActivityLogRepository
  ) {}
  async execute(command: ChangeAccessStatusCommand): Promise<any> {
    const exist = await this.repository.findUserById(command.id);
    if (!exist) {
      throw new BadRequestException('User not found');
    }


    if (
      exist._role.name.includes(SystemUserRole.ADMINISTRATOR) ||
      exist._role.name.includes(SystemUserRole.HEADMASTER)
    ) {
      throw new BadRequestException(`Request Denied. Cannot change access status of a super user!`);
    }

    console.log('Actor',command.admin);

    if (
      !command.admin._role.name.includes(SystemUserRole.ADMINISTRATOR) &&
      !command.admin._role.name.includes(SystemUserRole.HEADMASTER)
    ) {
      // console.log(command.admin._role.name, SystemUserRole.ADMINISTRATOR)
      throw new BadRequestException('Request not allowed. Administrative rights required');
    }

    const user = new User(exist, true);
    user.setAccessStatus(command.accessStatusDto.status);

    await this.repository.persist(user, true);

    const UserEmployeeProfileFullName = exist.name

    await this.activityLog.persist({
      userId: command.admin._id,
      formattedContent: `<b>${command.admin.displayName}</b> ${command.accessStatusDto.status?' activated ': ' deactivated'} <b>${UserEmployeeProfileFullName}</b> user profile`,
      content: `${command.admin.displayName} ${command.accessStatusDto.status?' activated ': ' deactivated'} ${UserEmployeeProfileFullName} user profile`,
      type: ActivityType.Update,
    });
  }
}
