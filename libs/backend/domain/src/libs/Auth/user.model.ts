import { AggregateRoot } from '@nestjs/cqrs';
import { Password } from './password.value';
import { UserAccountVerifiedEvent } from './events/user-account-verified.event';
import { AccountActivatedEvent } from './events/account-activated.event';
import { PasswordChangedEvent } from './events/password-changed.event';
import { Email, ExpiryDate, ModelId, PersonName, UuId } from '../Common';
import { IRole } from '../Users/IRole';
import { IUser } from '../Users/IUser';

export class User extends AggregateRoot {
  readonly id: ModelId;

  name: string;

  private _email: Email;
  get email() {
    return this._email;
  }

  private _roleId: ModelId;
  get roleId() {
    return this._roleId;
  }

  private _password: Password;
  get password() {
    return this._password;
  }

  private _isVerified: boolean;
  get isVerified() {
    return this._isVerified;
  }

  readonly verifyToken: string;
  readonly verifyExpires: ExpiryDate;
  readonly isEmployee: boolean;

  active: boolean;
  resetToken: string;
  resetExpires: ExpiryDate;

  readonly role: IRole;

  constructor(data: IUser, isExistingEntity = false) {
    super();
    this._roleId = ModelId.create(data.roleId);

    this.name = data.name
    this._email = new Email(data.email, true);

    // defaults
    this._password = Password.defaults();
    this._isVerified = false;
    this.verifyToken = UuId.generateKey();
    this.verifyExpires = ExpiryDate.create(3);
    this.isEmployee = true;
    this.active = true;

    this.role = null;

    // overrides from entity data
    if (isExistingEntity) {
      this.id = ModelId.create(data._id);
      this._password = Password.fromHash(data.password);
      this._isVerified = data.isVerified;
      this.verifyToken = data.verifyToken;
      this.verifyExpires = ExpiryDate.fromValue(data.verifyExpires);
      this.active = data.active;
      this.role = data._role;
    }
  }

  isPasswordSet() {
    return this._password.isPasswordSet;
  }

  isRoleAccessible() {
    return this.role && this.role.active;
  }


  verifyAccount() {
    this._isVerified = true;
    this.apply(new UserAccountVerifiedEvent(this));
  }

  activateAccount(plainTextPassword: string) {
    this._password = Password.generateHash(plainTextPassword);
    const hiddenPassword = Password.getHiddenFormat(plainTextPassword);

    this.apply(
      new AccountActivatedEvent(
        this.name,
        this.email.value,
        hiddenPassword
      )
    );
  }

  changePassword(newPasswordPlainText: string) {
    this._password = Password.generateHash(newPasswordPlainText);
    this.apply(
      new PasswordChangedEvent(
        this.name,
        this.email.value,
      )
    );
  }

  changeEmail(newOfficeEmail: string) {
    this._email = new Email(newOfficeEmail, true);
  }

  changeDisplayName(newName: string) {
    this.name = newName
  }

  setAccessStatus(status: boolean) {
    this.active = status;
  }

  changeRole(roleId: string) {
    this._roleId = ModelId.create(roleId);
  }
}
