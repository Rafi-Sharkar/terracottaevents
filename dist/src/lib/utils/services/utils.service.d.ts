import { ClassConstructor } from 'class-transformer';
export declare class UtilsService {
    sanitizedResponse(dto: any, data: any): unknown[];
    sanitizeWithRelations<T>(dto: ClassConstructor<any>, entity: Record<string, any>): T;
    removeDuplicateIds(ids: string[]): string[];
    safeParseJson<T>(value: any, fallback: T): T;
}
