import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";

@Injectable()
export class HeaderGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // fetching the required attribute from the header of the request
    const customHeader = request.headers["custom_auth"];


    if (customHeader !== "im-allowed-to-do-this") {
      throw new ForbiddenException({htttp_status: 'UNAUTHORIZED', http_code:'401',message:'Please authenticate correctly to access this feature!'});
    }

    return true;
  }
}
