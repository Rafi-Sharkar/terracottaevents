import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type RateLimitAttemptModel = runtime.Types.Result.DefaultSelection<Prisma.$RateLimitAttemptPayload>;
export type AggregateRateLimitAttempt = {
    _count: RateLimitAttemptCountAggregateOutputType | null;
    _min: RateLimitAttemptMinAggregateOutputType | null;
    _max: RateLimitAttemptMaxAggregateOutputType | null;
};
export type RateLimitAttemptMinAggregateOutputType = {
    id: string | null;
    identifier: string | null;
    action: string | null;
    success: boolean | null;
    createdAt: Date | null;
};
export type RateLimitAttemptMaxAggregateOutputType = {
    id: string | null;
    identifier: string | null;
    action: string | null;
    success: boolean | null;
    createdAt: Date | null;
};
export type RateLimitAttemptCountAggregateOutputType = {
    id: number;
    identifier: number;
    action: number;
    success: number;
    metadata: number;
    createdAt: number;
    _all: number;
};
export type RateLimitAttemptMinAggregateInputType = {
    id?: true;
    identifier?: true;
    action?: true;
    success?: true;
    createdAt?: true;
};
export type RateLimitAttemptMaxAggregateInputType = {
    id?: true;
    identifier?: true;
    action?: true;
    success?: true;
    createdAt?: true;
};
export type RateLimitAttemptCountAggregateInputType = {
    id?: true;
    identifier?: true;
    action?: true;
    success?: true;
    metadata?: true;
    createdAt?: true;
    _all?: true;
};
export type RateLimitAttemptAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RateLimitAttemptWhereInput;
    orderBy?: Prisma.RateLimitAttemptOrderByWithRelationInput | Prisma.RateLimitAttemptOrderByWithRelationInput[];
    cursor?: Prisma.RateLimitAttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RateLimitAttemptCountAggregateInputType;
    _min?: RateLimitAttemptMinAggregateInputType;
    _max?: RateLimitAttemptMaxAggregateInputType;
};
export type GetRateLimitAttemptAggregateType<T extends RateLimitAttemptAggregateArgs> = {
    [P in keyof T & keyof AggregateRateLimitAttempt]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRateLimitAttempt[P]> : Prisma.GetScalarType<T[P], AggregateRateLimitAttempt[P]>;
};
export type RateLimitAttemptGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RateLimitAttemptWhereInput;
    orderBy?: Prisma.RateLimitAttemptOrderByWithAggregationInput | Prisma.RateLimitAttemptOrderByWithAggregationInput[];
    by: Prisma.RateLimitAttemptScalarFieldEnum[] | Prisma.RateLimitAttemptScalarFieldEnum;
    having?: Prisma.RateLimitAttemptScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RateLimitAttemptCountAggregateInputType | true;
    _min?: RateLimitAttemptMinAggregateInputType;
    _max?: RateLimitAttemptMaxAggregateInputType;
};
export type RateLimitAttemptGroupByOutputType = {
    id: string;
    identifier: string;
    action: string;
    success: boolean;
    metadata: runtime.JsonValue | null;
    createdAt: Date;
    _count: RateLimitAttemptCountAggregateOutputType | null;
    _min: RateLimitAttemptMinAggregateOutputType | null;
    _max: RateLimitAttemptMaxAggregateOutputType | null;
};
export type GetRateLimitAttemptGroupByPayload<T extends RateLimitAttemptGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RateLimitAttemptGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RateLimitAttemptGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RateLimitAttemptGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RateLimitAttemptGroupByOutputType[P]>;
}>>;
export type RateLimitAttemptWhereInput = {
    AND?: Prisma.RateLimitAttemptWhereInput | Prisma.RateLimitAttemptWhereInput[];
    OR?: Prisma.RateLimitAttemptWhereInput[];
    NOT?: Prisma.RateLimitAttemptWhereInput | Prisma.RateLimitAttemptWhereInput[];
    id?: Prisma.StringFilter<"RateLimitAttempt"> | string;
    identifier?: Prisma.StringFilter<"RateLimitAttempt"> | string;
    action?: Prisma.StringFilter<"RateLimitAttempt"> | string;
    success?: Prisma.BoolFilter<"RateLimitAttempt"> | boolean;
    metadata?: Prisma.JsonNullableFilter<"RateLimitAttempt">;
    createdAt?: Prisma.DateTimeFilter<"RateLimitAttempt"> | Date | string;
};
export type RateLimitAttemptOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    identifier?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RateLimitAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RateLimitAttemptWhereInput | Prisma.RateLimitAttemptWhereInput[];
    OR?: Prisma.RateLimitAttemptWhereInput[];
    NOT?: Prisma.RateLimitAttemptWhereInput | Prisma.RateLimitAttemptWhereInput[];
    identifier?: Prisma.StringFilter<"RateLimitAttempt"> | string;
    action?: Prisma.StringFilter<"RateLimitAttempt"> | string;
    success?: Prisma.BoolFilter<"RateLimitAttempt"> | boolean;
    metadata?: Prisma.JsonNullableFilter<"RateLimitAttempt">;
    createdAt?: Prisma.DateTimeFilter<"RateLimitAttempt"> | Date | string;
}, "id">;
export type RateLimitAttemptOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    identifier?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RateLimitAttemptCountOrderByAggregateInput;
    _max?: Prisma.RateLimitAttemptMaxOrderByAggregateInput;
    _min?: Prisma.RateLimitAttemptMinOrderByAggregateInput;
};
export type RateLimitAttemptScalarWhereWithAggregatesInput = {
    AND?: Prisma.RateLimitAttemptScalarWhereWithAggregatesInput | Prisma.RateLimitAttemptScalarWhereWithAggregatesInput[];
    OR?: Prisma.RateLimitAttemptScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RateLimitAttemptScalarWhereWithAggregatesInput | Prisma.RateLimitAttemptScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RateLimitAttempt"> | string;
    identifier?: Prisma.StringWithAggregatesFilter<"RateLimitAttempt"> | string;
    action?: Prisma.StringWithAggregatesFilter<"RateLimitAttempt"> | string;
    success?: Prisma.BoolWithAggregatesFilter<"RateLimitAttempt"> | boolean;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"RateLimitAttempt">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RateLimitAttempt"> | Date | string;
};
export type RateLimitAttemptCreateInput = {
    id?: string;
    identifier: string;
    action: string;
    success: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type RateLimitAttemptUncheckedCreateInput = {
    id?: string;
    identifier: string;
    action: string;
    success: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type RateLimitAttemptUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RateLimitAttemptUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RateLimitAttemptCreateManyInput = {
    id?: string;
    identifier: string;
    action: string;
    success: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type RateLimitAttemptUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RateLimitAttemptUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    identifier?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RateLimitAttemptCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    identifier?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RateLimitAttemptMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    identifier?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RateLimitAttemptMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    identifier?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type RateLimitAttemptSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    identifier?: boolean;
    action?: boolean;
    success?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["rateLimitAttempt"]>;
export type RateLimitAttemptSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    identifier?: boolean;
    action?: boolean;
    success?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["rateLimitAttempt"]>;
export type RateLimitAttemptSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    identifier?: boolean;
    action?: boolean;
    success?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["rateLimitAttempt"]>;
export type RateLimitAttemptSelectScalar = {
    id?: boolean;
    identifier?: boolean;
    action?: boolean;
    success?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
};
export type RateLimitAttemptOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "identifier" | "action" | "success" | "metadata" | "createdAt", ExtArgs["result"]["rateLimitAttempt"]>;
export type $RateLimitAttemptPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RateLimitAttempt";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        identifier: string;
        action: string;
        success: boolean;
        metadata: runtime.JsonValue | null;
        createdAt: Date;
    }, ExtArgs["result"]["rateLimitAttempt"]>;
    composites: {};
};
export type RateLimitAttemptGetPayload<S extends boolean | null | undefined | RateLimitAttemptDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RateLimitAttemptPayload, S>;
export type RateLimitAttemptCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RateLimitAttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RateLimitAttemptCountAggregateInputType | true;
};
export interface RateLimitAttemptDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RateLimitAttempt'];
        meta: {
            name: 'RateLimitAttempt';
        };
    };
    findUnique<T extends RateLimitAttemptFindUniqueArgs>(args: Prisma.SelectSubset<T, RateLimitAttemptFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RateLimitAttemptClient<runtime.Types.Result.GetResult<Prisma.$RateLimitAttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RateLimitAttemptFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RateLimitAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RateLimitAttemptClient<runtime.Types.Result.GetResult<Prisma.$RateLimitAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RateLimitAttemptFindFirstArgs>(args?: Prisma.SelectSubset<T, RateLimitAttemptFindFirstArgs<ExtArgs>>): Prisma.Prisma__RateLimitAttemptClient<runtime.Types.Result.GetResult<Prisma.$RateLimitAttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RateLimitAttemptFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RateLimitAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RateLimitAttemptClient<runtime.Types.Result.GetResult<Prisma.$RateLimitAttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RateLimitAttemptFindManyArgs>(args?: Prisma.SelectSubset<T, RateLimitAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RateLimitAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RateLimitAttemptCreateArgs>(args: Prisma.SelectSubset<T, RateLimitAttemptCreateArgs<ExtArgs>>): Prisma.Prisma__RateLimitAttemptClient<runtime.Types.Result.GetResult<Prisma.$RateLimitAttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RateLimitAttemptCreateManyArgs>(args?: Prisma.SelectSubset<T, RateLimitAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RateLimitAttemptCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RateLimitAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RateLimitAttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RateLimitAttemptDeleteArgs>(args: Prisma.SelectSubset<T, RateLimitAttemptDeleteArgs<ExtArgs>>): Prisma.Prisma__RateLimitAttemptClient<runtime.Types.Result.GetResult<Prisma.$RateLimitAttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RateLimitAttemptUpdateArgs>(args: Prisma.SelectSubset<T, RateLimitAttemptUpdateArgs<ExtArgs>>): Prisma.Prisma__RateLimitAttemptClient<runtime.Types.Result.GetResult<Prisma.$RateLimitAttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RateLimitAttemptDeleteManyArgs>(args?: Prisma.SelectSubset<T, RateLimitAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RateLimitAttemptUpdateManyArgs>(args: Prisma.SelectSubset<T, RateLimitAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RateLimitAttemptUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RateLimitAttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RateLimitAttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RateLimitAttemptUpsertArgs>(args: Prisma.SelectSubset<T, RateLimitAttemptUpsertArgs<ExtArgs>>): Prisma.Prisma__RateLimitAttemptClient<runtime.Types.Result.GetResult<Prisma.$RateLimitAttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RateLimitAttemptCountArgs>(args?: Prisma.Subset<T, RateLimitAttemptCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RateLimitAttemptCountAggregateOutputType> : number>;
    aggregate<T extends RateLimitAttemptAggregateArgs>(args: Prisma.Subset<T, RateLimitAttemptAggregateArgs>): Prisma.PrismaPromise<GetRateLimitAttemptAggregateType<T>>;
    groupBy<T extends RateLimitAttemptGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RateLimitAttemptGroupByArgs['orderBy'];
    } : {
        orderBy?: RateLimitAttemptGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RateLimitAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRateLimitAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RateLimitAttemptFieldRefs;
}
export interface Prisma__RateLimitAttemptClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RateLimitAttemptFieldRefs {
    readonly id: Prisma.FieldRef<"RateLimitAttempt", 'String'>;
    readonly identifier: Prisma.FieldRef<"RateLimitAttempt", 'String'>;
    readonly action: Prisma.FieldRef<"RateLimitAttempt", 'String'>;
    readonly success: Prisma.FieldRef<"RateLimitAttempt", 'Boolean'>;
    readonly metadata: Prisma.FieldRef<"RateLimitAttempt", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"RateLimitAttempt", 'DateTime'>;
}
export type RateLimitAttemptFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateLimitAttemptSelect<ExtArgs> | null;
    omit?: Prisma.RateLimitAttemptOmit<ExtArgs> | null;
    where: Prisma.RateLimitAttemptWhereUniqueInput;
};
export type RateLimitAttemptFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateLimitAttemptSelect<ExtArgs> | null;
    omit?: Prisma.RateLimitAttemptOmit<ExtArgs> | null;
    where: Prisma.RateLimitAttemptWhereUniqueInput;
};
export type RateLimitAttemptFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateLimitAttemptSelect<ExtArgs> | null;
    omit?: Prisma.RateLimitAttemptOmit<ExtArgs> | null;
    where?: Prisma.RateLimitAttemptWhereInput;
    orderBy?: Prisma.RateLimitAttemptOrderByWithRelationInput | Prisma.RateLimitAttemptOrderByWithRelationInput[];
    cursor?: Prisma.RateLimitAttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RateLimitAttemptScalarFieldEnum | Prisma.RateLimitAttemptScalarFieldEnum[];
};
export type RateLimitAttemptFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateLimitAttemptSelect<ExtArgs> | null;
    omit?: Prisma.RateLimitAttemptOmit<ExtArgs> | null;
    where?: Prisma.RateLimitAttemptWhereInput;
    orderBy?: Prisma.RateLimitAttemptOrderByWithRelationInput | Prisma.RateLimitAttemptOrderByWithRelationInput[];
    cursor?: Prisma.RateLimitAttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RateLimitAttemptScalarFieldEnum | Prisma.RateLimitAttemptScalarFieldEnum[];
};
export type RateLimitAttemptFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateLimitAttemptSelect<ExtArgs> | null;
    omit?: Prisma.RateLimitAttemptOmit<ExtArgs> | null;
    where?: Prisma.RateLimitAttemptWhereInput;
    orderBy?: Prisma.RateLimitAttemptOrderByWithRelationInput | Prisma.RateLimitAttemptOrderByWithRelationInput[];
    cursor?: Prisma.RateLimitAttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RateLimitAttemptScalarFieldEnum | Prisma.RateLimitAttemptScalarFieldEnum[];
};
export type RateLimitAttemptCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateLimitAttemptSelect<ExtArgs> | null;
    omit?: Prisma.RateLimitAttemptOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RateLimitAttemptCreateInput, Prisma.RateLimitAttemptUncheckedCreateInput>;
};
export type RateLimitAttemptCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RateLimitAttemptCreateManyInput | Prisma.RateLimitAttemptCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RateLimitAttemptCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateLimitAttemptSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RateLimitAttemptOmit<ExtArgs> | null;
    data: Prisma.RateLimitAttemptCreateManyInput | Prisma.RateLimitAttemptCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RateLimitAttemptUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateLimitAttemptSelect<ExtArgs> | null;
    omit?: Prisma.RateLimitAttemptOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RateLimitAttemptUpdateInput, Prisma.RateLimitAttemptUncheckedUpdateInput>;
    where: Prisma.RateLimitAttemptWhereUniqueInput;
};
export type RateLimitAttemptUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RateLimitAttemptUpdateManyMutationInput, Prisma.RateLimitAttemptUncheckedUpdateManyInput>;
    where?: Prisma.RateLimitAttemptWhereInput;
    limit?: number;
};
export type RateLimitAttemptUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateLimitAttemptSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RateLimitAttemptOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RateLimitAttemptUpdateManyMutationInput, Prisma.RateLimitAttemptUncheckedUpdateManyInput>;
    where?: Prisma.RateLimitAttemptWhereInput;
    limit?: number;
};
export type RateLimitAttemptUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateLimitAttemptSelect<ExtArgs> | null;
    omit?: Prisma.RateLimitAttemptOmit<ExtArgs> | null;
    where: Prisma.RateLimitAttemptWhereUniqueInput;
    create: Prisma.XOR<Prisma.RateLimitAttemptCreateInput, Prisma.RateLimitAttemptUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RateLimitAttemptUpdateInput, Prisma.RateLimitAttemptUncheckedUpdateInput>;
};
export type RateLimitAttemptDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateLimitAttemptSelect<ExtArgs> | null;
    omit?: Prisma.RateLimitAttemptOmit<ExtArgs> | null;
    where: Prisma.RateLimitAttemptWhereUniqueInput;
};
export type RateLimitAttemptDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RateLimitAttemptWhereInput;
    limit?: number;
};
export type RateLimitAttemptDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateLimitAttemptSelect<ExtArgs> | null;
    omit?: Prisma.RateLimitAttemptOmit<ExtArgs> | null;
};
