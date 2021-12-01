import {IsNotEmpty, IsEmail, IsArray, IsEnum, IsOptional, ArrayUnique,} from "class-validator";


export enum LeadType {
  INDIVIDUAL = 'INDIVIDUAL',
  ORGANIZATION = 'ORGANIZATION'
}


export class CreateLeadDto {


    @IsNotEmpty()
    @IsEnum(LeadType)
    type: LeadType


    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsOptional()
    industry: string;

    @IsOptional()
    locationAddress: string;

    @IsOptional()
    city: string;

    @IsOptional()
    region: string;

    @IsOptional()
    country: string;

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    contactPersons: any[] /*IContactPerson[];*/
}
