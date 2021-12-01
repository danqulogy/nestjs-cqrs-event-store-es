import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt} from 'passport-jwt'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '@fom/backend/persistence';
import { JwtPayload } from './commands';
import { environment } from '@fom/backend/common';
import { SystemUserRole } from "@fom/shared/api-dtos";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.authentication.secret
    });
  }

  async validate(payload: JwtPayload){
    const user = await this.usersRepository.findActiveUserByEmail(payload.email)
    // console.log('AUTH USER: ', user);
    if(!user) {
      throw new UnauthorizedException(`Unauthorized access. ${!environment.production?'User not found based on jwt payload': ''}`)
    }



    return user
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){

}
