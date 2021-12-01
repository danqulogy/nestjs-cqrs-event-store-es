import { ISchool, SchoolsRepository } from '@fom/backend/persistence';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MailerService } from '@nestjs-modules/mailer';
import { environment } from '@fom/backend/common';

export class DispatchEnrollmentNoticeCommand {
}

@CommandHandler(DispatchEnrollmentNoticeCommand)
export class DispatchEnrollmentNoticeCommandHandler implements ICommandHandler<DispatchEnrollmentNoticeCommand>{
  constructor(private repository: SchoolsRepository, private readonly mailerService: MailerService) {
  }

  async execute(command: DispatchEnrollmentNoticeCommand): Promise<any> {

    const undispatchedSchools = await this.repository.findUndispatchedSchools()

    console.log('undispatchedSchools count', undispatchedSchools.length)

    undispatchedSchools.map( async school => {
      await this.sendEmail(school)
    })
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
