import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { isBoolean } from 'class-validator';
import { RegisterUserDto } from '@fom/shared/api-dtos';
import {
  SchoolsRepository,
  RolesRepository,
  UsersRepository,
} from '@fom/backend/persistence';
import { FeLogger } from '@fom/backend/common';
import {
  IRole,
  IUser,
  Password,
  RoleCardinality,
  User,
  UserRegisteredEvent,
} from '@fom/backend/domain';

export class RegisterUserCommand implements ICommand {
  constructor(public readonly payload: RegisterUserDto) {}
}

@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    public membersRepository: SchoolsRepository,
    public rolesRepository: RolesRepository,
    private publisher: EventPublisher,
    private console: FeLogger,
    private eventBus: EventBus,
    private usersRepository: UsersRepository
  ) {
    this.console.setContext(RegisterUserCommandHandler.name);
  }

  async execute(command: RegisterUserCommand): Promise<any> {
    const { name, email, roleId } = command.payload;

    const role = await this.getRole(roleId);

    await this.checkIfRoleIsActive(role.active);
    await this.checkCardinalityRoleBrokage(role);

    const payload: IUser = {
      roleId: role._id,
      name: name,
      email: email,
      isVerified: true,
      active: true,
      password: Password.generateHash('password123!').value,
    };

    return this.usersRepository.persistAndMarkActive(payload);
    // const user = this.publisher.mergeObjectContext(
    //   new User({
    //     roleId: role._id,
    //     name: name,
    //     email: email,
    //     isVerified: true,
    //     active: true,
    //     password: 'password123!'
    //   })
    // )

    // const savedUser  = await this.usersRepository.persist(user)

    // this.eventBus.publish(new UserRegisteredEvent(savedUser, role.name, name))

    // return Promise.resolve(undefined)
  }

  private async getEmployee(employeeId: string) {
    const employee = await this.membersRepository.findById(employeeId);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  private isRoleCardinalityOfOne(roleCardinality: number) {
    return roleCardinality === RoleCardinality.One;
  }

  private async postCardinalityRuleValidation(_id: string) {
    const count = await this.usersRepository.findTotalActiveUsersByRoleId(_id);
    return count >= 1;
  }

  private async getRole(roleId: string) {
    const role = await this.rolesRepository.findById(roleId);
    if (!role) {
      throw new NotFoundException('User role not found');
    }
    return role;
  }

  private async checkCardinalityRoleBrokage(role: IRole) {
    if (
      this.isRoleCardinalityOfOne(role.cardinality) &&
      (await this.postCardinalityRuleValidation(role._id))
    ) {
      throw new BadRequestException(
        `Not allowed. There can only be one ${role.name} in the system`
      );
    }
  }

  private async checkIfRoleIsActive(active: boolean) {
    isBoolean(active);

    if (!active) {
      throw new BadRequestException(
        'The selected role has been disabled.' +
          ' Cannot register a user to a disabled role'
      );
    }
  }

  private async checkIfEmployeeAlreadyExistAsUser(employeeId: string) {
    const exist = await this.usersRepository.checkIfEmployeeAlreadyExist(
      employeeId
    );
    if (exist && exist.active) {
      throw new BadRequestException(
        'Specified employee is already an system user'
      );
    }

    if (exist && !exist.active) {
      throw new BadRequestException(
        'Specified employee is already a system user. But has been deactivated'
      );
    }
  }
}
