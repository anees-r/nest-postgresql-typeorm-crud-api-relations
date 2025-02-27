import { IsNotEmpty, IsString } from "class-validator";
import { EmailValidator } from "src/decorators/email.validator.decorator";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    @IsNotEmpty()
    @EmailValidator()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}