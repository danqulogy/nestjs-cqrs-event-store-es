import {IsIn, IsNotEmpty, IsOptional} from "class-validator";

export class LeadsFilterDto {
    @IsOptional()
    // @IsIn([
    //   LeadStatus.LEAD,
    //   LeadStatus.CLOSE_LOST,
    //   LeadStatus.CLOSE_WON,
    //   LeadStatus.OPPORTUNITY,
    //   LeadStatus.PROSPECT
    // ])
    status: string

    @IsOptional()
    @IsNotEmpty()
    search: string
}
