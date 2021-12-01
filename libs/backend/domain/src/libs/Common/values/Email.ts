import { BadRequestException } from '@nestjs/common'
import { ValueObject } from '../base';
import { InvalidArgumentException, InvalidEmailFormatException } from '../exceptions';

export class Email extends ValueObject<string>{

    readonly value: string

    constructor(input, isOfficialEmail:boolean= false) {
        super()
        if (!Email.isValidEmail(input)){
            throw new InvalidEmailFormatException('Invalid email address format')
        }
        if (input===null || input === undefined) {
            throw new InvalidArgumentException('Username is required')
        }

        if (isOfficialEmail){
            this.checkValidMaybertOfficeEmail(input)
        }
        this.value = input
    }

    private static isValidEmail(aUsername: string){
        const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return EMAIL_REGEX.test(String(aUsername))
    }

    private checkValidMaybertOfficeEmail(officeEmail: string) {

        // TODO: should use value provided in environment files. perhaps migrate the module
        const useSpecificOfficeEmailTypes = false
        const emailSuffixes = ['@maybertgh.com']


        if (useSpecificOfficeEmailTypes) {
            emailSuffixes.map(s => {
                if (!officeEmail.endsWith(s)){
                    throw new BadRequestException(
                      'Invalid email domain. An authorized maybert email is required. Contact your administrator',
                    )
                }
                return s
            })
        }
    }
}
