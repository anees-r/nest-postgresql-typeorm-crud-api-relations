import { IsOptional, IsString } from "class-validator";
import { EmailValidator } from "src/decorators/email.validator.decorator";

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    @EmailValidator()
    email?: string

    @IsOptional()
    @IsString()
    password?: string
}