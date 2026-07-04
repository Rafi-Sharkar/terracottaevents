import { PrismaService } from "../../lib/prisma/prisma.service";
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { JWTPayload } from './jwt.interface';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly config;
    private readonly prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: JWTPayload): Promise<JWTPayload>;
}
export {};
