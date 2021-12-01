import { ISchool, RolesRepository, SchoolsRepository, UsersRepository } from '@fom/backend/persistence';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MailerService } from '@nestjs-modules/mailer';
import { environment } from '@fom/backend/common';
import { EnrollSchoolDto, SchoolEnrollmentStatus, SystemUserRole } from '@fom/shared/api-dtos';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Password } from '@fom/backend/domain';

export class EnrollSchoolCommand {
  constructor(public readonly  payload: EnrollSchoolDto) {
  }
}

@CommandHandler(EnrollSchoolCommand)
export class EnrollSchoolCommandHandler implements ICommandHandler<EnrollSchoolCommand>{
  constructor(private repository: SchoolsRepository,
              private userRepository: UsersRepository,
              private roleRepository: RolesRepository,
              private readonly mailerService: MailerService) {
  }

  async execute(command: EnrollSchoolCommand): Promise<any> {

    const schoolExist = await  this.repository.findByEnrollmentKey(command.payload.enrollmentKey)
    if(!schoolExist){
      throw new NotFoundException('Invalid School enrollment application')
    }

    if (command.payload.totalNumberOfBoardingStudents + command.payload.totalNumberOfDayStudents !== command.payload.totalNumberOfStudents){
      throw new BadRequestException('Provided values of student population is not correct. The total does not balance the parts')
    }

    if(schoolExist.enrollmentStatus === SchoolEnrollmentStatus.ENROLLED){
      throw new BadRequestException(('Your school has already been enrolled'))
    }

    // Mark school as enrolled
    try {
      await this.repository.markAsEnrolled(schoolExist._id, command.payload)
    }catch (e) {
      throw new BadRequestException('An error occurred while enrolling school')
    }

    // Setup user account for Headmaster
    const {headTeacher}= schoolExist

    const role = await this.roleRepository.findByName(SystemUserRole.HEADMASTER)
    if(!role){
      throw new BadRequestException('Role not found')
    }

    const emailExist = await this.userRepository.findActiveUserByEmail(headTeacher.email)
    if (emailExist){
      throw new BadRequestException('A user with the same email already exist. Set a new email or contact the ministry')
    }

    try {

      await this.userRepository.seed({
        name: headTeacher.name,
        email: headTeacher.email,
        _roleName: SystemUserRole.HEADMASTER,
        password: (Password.generateHash(command.payload.password)).value,
        active: true,
        isVerified: true,
        roleId: role._id,
        schoolId: schoolExist._id
      })
    }catch (e) {
      throw new BadRequestException('An error occurred while setting up user account')
    }

    //TODO: Send acknowledgemnent email to Headmaster
  }

  async sendEmail(school: ISchool){
    try {
      let {name, email} = school.headTeacher

      if (!environment.production){
        name = 'Danquah Bernard White'
        email = 'danquahwhite@gmail.com'
      }

      console.log('Sending email to', school.headTeacher.email)


      const enrollmentLink = `${environment.clientApps.school}/#/enrollment?code=${school.enrollmentKey}`

      await this.mailerService.sendMail({
          to: `${name} <${email}>`,
          from: '"MOE Food Inventory Management" <ministerofeducationdevelopment@gmail.com>',
          subject: 'SHS Food Supply Enrollment Notice',
          html: `
          <div class='text-blue-600'>
            <p>Dear <b>${name}</b>,</p>

            <p>As Headmaster of <b>${school.name}</b>, this email is a notice to enroll your school on the <b>SHS Food Inventory Management System</b>.</p>
            <p>Click here to <a href='${enrollmentLink}' >Enroll your School</a> today</p>
            <p>Thank you.</p>

            <br><br>
            <div>Ministry of Education</div>
            <div>Food Inventory Management</div>
            <div>Technical Team</div>
          </div>
          `
        })

      await this.repository.markAsDispatched(school._id)
    }catch (e) {
      console.log('email sending failed', e, school)
    }
  }
}
