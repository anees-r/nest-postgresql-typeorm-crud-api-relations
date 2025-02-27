import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/user/user.entity";

export class CreateBookDto{
    @IsNotEmpty()
    title: string
}