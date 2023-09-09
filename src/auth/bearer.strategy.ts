import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-http-bearer'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  private readonly apiKey: string

  constructor(private configService: ConfigService) {
    super()
    this.apiKey = this.configService.get<string>('API_KEY')
  }

  async validate(token: string): Promise<any> {
    if (token === this.apiKey) {
      return { isValid: true }
    } else {
      throw new UnauthorizedException()
    }
  }
}
