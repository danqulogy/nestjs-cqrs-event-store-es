import { Injectable, Logger } from '@nestjs/common';
import { environment, FeLogger } from '@fom/backend/common';
import { GhanaRegionsEnum, SchoolGenderType } from '@fom/shared/api-dtos';
import { v4 } from 'uuid';
import { ISchool, SchoolDocument, SchoolsRepository } from './index';


@Injectable()
export class SchoolsSeederService {

  SCHOOLS: ISchool[] = [
    {
      name: 'Abuakwa State College',
      enrollmentKey: '61839ccb7580471307b16959',
      genderType: SchoolGenderType.BOYS_AND_GIRLS,
      postalAddress: 'Eastern Region-Kibi, Ghana',
      region: GhanaRegionsEnum.EASTERN,
      town: 'Abuakwa',
      headTeacher: {
        name: 'Mr. Opoku Mensah',
        phoneNumber: '0240313771',
        email:  environment.production? 'dublit2002@gmail.com' : 'opoku@acs.com'
      }
    },
    {
      name: 'Bimbilla Senior High School',
      enrollmentKey: '61839cdd00be325c1e8c8edd',
      genderType: SchoolGenderType.BOYS_AND_GIRLS,
      postalAddress: 'Bimbilla, Northern Region',
      region: GhanaRegionsEnum.NORTHERN,
      town: 'Bimbila',
      headTeacher: {
        name: 'Mohammed Yakubu Mustapha',
        phoneNumber: '0240313771',
        email: 'mohammedYakubu@bshs.com'
      }
    },
    {
      name: 'Ghana Senior High Technical School',
      enrollmentKey: '61839e34f06421c7075810e5',
      genderType: SchoolGenderType.BOYS,
      postalAddress: 'Pobee Biney Rd, Sekondi-Takoradi, Western Region, Ghana',
      region: GhanaRegionsEnum.WESTERN,
      town: 'Sekondi Takoradi',
      headTeacher: {
        name: 'Mr. S.K.Essel',
        phoneNumber: '0240313771',
        email: 'essel@moe.com'
      }
    },

    {
      name: 'Kumasi Academy',
      enrollmentKey: '61839ede5b6f8947fc42cf7b',
      genderType: SchoolGenderType.BOYS_AND_GIRLS,
      postalAddress: 'P. O. Box 3814, Asokore Mampon - Ashanti, Ghana',
      region: GhanaRegionsEnum.ASHANTI,
      town: 'Asokore Mampong',
      headTeacher: {
        name: 'Mr. S.K.Essel',
        phoneNumber: '0240313771',
        email: 'essel@moe.com'
      }
    },

    {
      name: 'Presbyterian Senior High School',
      enrollmentKey: '61839ede5b6f8947fc42cf7b',
      genderType: SchoolGenderType.BOYS_AND_GIRLS,
      postalAddress: 'P.O. Box M173, Osu - Accra, Ghana, Greater Accra Region',
      region: GhanaRegionsEnum.GREATER_ACCRA,
      town: 'Osu, ',
      headTeacher: {
        name: 'Mr. Augustine Ofori',
        phoneNumber: '0240313771',
        email: environment.production ? 'austintrillo2011@gmail.com': 'danquahwhite@gmail.com'
      }
    },

    {
      name: 'West African Senior High School',
      enrollmentKey: '61839f6b83a1751cd0348b54',
      genderType: SchoolGenderType.BOYS_AND_GIRLS,
      postalAddress: 'P. O. Box LG 298, Adenta - Greater Accra Region',
      region: GhanaRegionsEnum.GREATER_ACCRA,
      town: 'Adentan Municipal',
      headTeacher: {
        name: 'Mr. Ofori Antwi',
        phoneNumber: '0240313771',
        email:  environment.production? 'danquahwhite@gmail.com' : 'ailentechdevteam@gmail.com'
      }
    },

  ]

  seedCount = 0
  constructor(private readonly repository: SchoolsRepository,
              private console: FeLogger,) {
  }

  private async seed(): Promise<Array<Promise<SchoolDocument>>>{

    return this.SCHOOLS.map(async (school: ISchool) => {
      return await this.repository
        .findByEnrollmentKey(school.enrollmentKey)
        .then(async exist => {
          if (exist){
            return Promise.resolve(null)
          }
          return Promise.resolve(this.repository.seedSchool(school))
        })
        .catch(error => Promise.reject(error))
    })
  }

  async migrate(){
    let totalSeed = 0

    return await this.seed()
      .then(async created => {

        await Promise.all(created).then(roles => {
          const seeded = roles.filter(l => l !== null)
          totalSeed = seeded.length
        })

        if (totalSeed){
          this.console.log(`Seeded ${totalSeed} schools...`)
        }

        return Promise.resolve(totalSeed)
      })
      .catch(error => {
        Logger.log('An error occurred while seeding schools')
        return Promise.reject(error)
      })
  }

}
