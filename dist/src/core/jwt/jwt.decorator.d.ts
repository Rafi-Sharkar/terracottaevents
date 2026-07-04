import { UserEnum } from "../../common/enum/user.enum";
import { JWTPayload } from './jwt.interface';
export declare const Roles: (...roles: UserEnum[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const GetUser: (...dataOrPipes: (keyof JWTPayload | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
export declare function ValidateAuth(...roles: UserEnum[]): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare function ValidateSuperAdmin(): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare function ValidateAdmin(): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare function ValidateUser(): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
