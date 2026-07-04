import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type BenefitsModel = runtime.Types.Result.DefaultSelection<Prisma.$BenefitsPayload>;
export type AggregateBenefits = {
    _count: BenefitsCountAggregateOutputType | null;
    _min: BenefitsMinAggregateOutputType | null;
    _max: BenefitsMaxAggregateOutputType | null;
};
export type BenefitsMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
};
export type BenefitsMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
};
export type BenefitsCountAggregateOutputType = {
    id: number;
    name: number;
    createdAt: number;
    _all: number;
};
export type BenefitsMinAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
};
export type BenefitsMaxAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
};
export type BenefitsCountAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    _all?: true;
};
export type BenefitsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BenefitsWhereInput;
    orderBy?: Prisma.BenefitsOrderByWithRelationInput | Prisma.BenefitsOrderByWithRelationInput[];
    cursor?: Prisma.BenefitsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BenefitsCountAggregateInputType;
    _min?: BenefitsMinAggregateInputType;
    _max?: BenefitsMaxAggregateInputType;
};
export type GetBenefitsAggregateType<T extends BenefitsAggregateArgs> = {
    [P in keyof T & keyof AggregateBenefits]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBenefits[P]> : Prisma.GetScalarType<T[P], AggregateBenefits[P]>;
};
export type BenefitsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BenefitsWhereInput;
    orderBy?: Prisma.BenefitsOrderByWithAggregationInput | Prisma.BenefitsOrderByWithAggregationInput[];
    by: Prisma.BenefitsScalarFieldEnum[] | Prisma.BenefitsScalarFieldEnum;
    having?: Prisma.BenefitsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BenefitsCountAggregateInputType | true;
    _min?: BenefitsMinAggregateInputType;
    _max?: BenefitsMaxAggregateInputType;
};
export type BenefitsGroupByOutputType = {
    id: string;
    name: string;
    createdAt: Date;
    _count: BenefitsCountAggregateOutputType | null;
    _min: BenefitsMinAggregateOutputType | null;
    _max: BenefitsMaxAggregateOutputType | null;
};
export type GetBenefitsGroupByPayload<T extends BenefitsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BenefitsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BenefitsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BenefitsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BenefitsGroupByOutputType[P]>;
}>>;
export type BenefitsWhereInput = {
    AND?: Prisma.BenefitsWhereInput | Prisma.BenefitsWhereInput[];
    OR?: Prisma.BenefitsWhereInput[];
    NOT?: Prisma.BenefitsWhereInput | Prisma.BenefitsWhereInput[];
    id?: Prisma.StringFilter<"Benefits"> | string;
    name?: Prisma.StringFilter<"Benefits"> | string;
    createdAt?: Prisma.DateTimeFilter<"Benefits"> | Date | string;
    plans?: Prisma.PlanBenefitsListRelationFilter;
};
export type BenefitsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    plans?: Prisma.PlanBenefitsOrderByRelationAggregateInput;
};
export type BenefitsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.BenefitsWhereInput | Prisma.BenefitsWhereInput[];
    OR?: Prisma.BenefitsWhereInput[];
    NOT?: Prisma.BenefitsWhereInput | Prisma.BenefitsWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"Benefits"> | Date | string;
    plans?: Prisma.PlanBenefitsListRelationFilter;
}, "id" | "name">;
export type BenefitsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.BenefitsCountOrderByAggregateInput;
    _max?: Prisma.BenefitsMaxOrderByAggregateInput;
    _min?: Prisma.BenefitsMinOrderByAggregateInput;
};
export type BenefitsScalarWhereWithAggregatesInput = {
    AND?: Prisma.BenefitsScalarWhereWithAggregatesInput | Prisma.BenefitsScalarWhereWithAggregatesInput[];
    OR?: Prisma.BenefitsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BenefitsScalarWhereWithAggregatesInput | Prisma.BenefitsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Benefits"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Benefits"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Benefits"> | Date | string;
};
export type BenefitsCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    plans?: Prisma.PlanBenefitsCreateNestedManyWithoutBenefitsInput;
};
export type BenefitsUncheckedCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    plans?: Prisma.PlanBenefitsUncheckedCreateNestedManyWithoutBenefitsInput;
};
export type BenefitsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plans?: Prisma.PlanBenefitsUpdateManyWithoutBenefitsNestedInput;
};
export type BenefitsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plans?: Prisma.PlanBenefitsUncheckedUpdateManyWithoutBenefitsNestedInput;
};
export type BenefitsCreateManyInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
};
export type BenefitsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BenefitsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BenefitsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BenefitsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BenefitsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BenefitsScalarRelationFilter = {
    is?: Prisma.BenefitsWhereInput;
    isNot?: Prisma.BenefitsWhereInput;
};
export type BenefitsCreateNestedOneWithoutPlansInput = {
    create?: Prisma.XOR<Prisma.BenefitsCreateWithoutPlansInput, Prisma.BenefitsUncheckedCreateWithoutPlansInput>;
    connectOrCreate?: Prisma.BenefitsCreateOrConnectWithoutPlansInput;
    connect?: Prisma.BenefitsWhereUniqueInput;
};
export type BenefitsUpdateOneRequiredWithoutPlansNestedInput = {
    create?: Prisma.XOR<Prisma.BenefitsCreateWithoutPlansInput, Prisma.BenefitsUncheckedCreateWithoutPlansInput>;
    connectOrCreate?: Prisma.BenefitsCreateOrConnectWithoutPlansInput;
    upsert?: Prisma.BenefitsUpsertWithoutPlansInput;
    connect?: Prisma.BenefitsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BenefitsUpdateToOneWithWhereWithoutPlansInput, Prisma.BenefitsUpdateWithoutPlansInput>, Prisma.BenefitsUncheckedUpdateWithoutPlansInput>;
};
export type BenefitsCreateWithoutPlansInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
};
export type BenefitsUncheckedCreateWithoutPlansInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
};
export type BenefitsCreateOrConnectWithoutPlansInput = {
    where: Prisma.BenefitsWhereUniqueInput;
    create: Prisma.XOR<Prisma.BenefitsCreateWithoutPlansInput, Prisma.BenefitsUncheckedCreateWithoutPlansInput>;
};
export type BenefitsUpsertWithoutPlansInput = {
    update: Prisma.XOR<Prisma.BenefitsUpdateWithoutPlansInput, Prisma.BenefitsUncheckedUpdateWithoutPlansInput>;
    create: Prisma.XOR<Prisma.BenefitsCreateWithoutPlansInput, Prisma.BenefitsUncheckedCreateWithoutPlansInput>;
    where?: Prisma.BenefitsWhereInput;
};
export type BenefitsUpdateToOneWithWhereWithoutPlansInput = {
    where?: Prisma.BenefitsWhereInput;
    data: Prisma.XOR<Prisma.BenefitsUpdateWithoutPlansInput, Prisma.BenefitsUncheckedUpdateWithoutPlansInput>;
};
export type BenefitsUpdateWithoutPlansInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BenefitsUncheckedUpdateWithoutPlansInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BenefitsCountOutputType = {
    plans: number;
};
export type BenefitsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plans?: boolean | BenefitsCountOutputTypeCountPlansArgs;
};
export type BenefitsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BenefitsCountOutputTypeSelect<ExtArgs> | null;
};
export type BenefitsCountOutputTypeCountPlansArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlanBenefitsWhereInput;
};
export type BenefitsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    plans?: boolean | Prisma.Benefits$plansArgs<ExtArgs>;
    _count?: boolean | Prisma.BenefitsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["benefits"]>;
export type BenefitsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["benefits"]>;
export type BenefitsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["benefits"]>;
export type BenefitsSelectScalar = {
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
};
export type BenefitsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "createdAt", ExtArgs["result"]["benefits"]>;
export type BenefitsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plans?: boolean | Prisma.Benefits$plansArgs<ExtArgs>;
    _count?: boolean | Prisma.BenefitsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BenefitsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type BenefitsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $BenefitsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Benefits";
    objects: {
        plans: Prisma.$PlanBenefitsPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        createdAt: Date;
    }, ExtArgs["result"]["benefits"]>;
    composites: {};
};
export type BenefitsGetPayload<S extends boolean | null | undefined | BenefitsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BenefitsPayload, S>;
export type BenefitsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BenefitsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BenefitsCountAggregateInputType | true;
};
export interface BenefitsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Benefits'];
        meta: {
            name: 'Benefits';
        };
    };
    findUnique<T extends BenefitsFindUniqueArgs>(args: Prisma.SelectSubset<T, BenefitsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BenefitsClient<runtime.Types.Result.GetResult<Prisma.$BenefitsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BenefitsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BenefitsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BenefitsClient<runtime.Types.Result.GetResult<Prisma.$BenefitsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BenefitsFindFirstArgs>(args?: Prisma.SelectSubset<T, BenefitsFindFirstArgs<ExtArgs>>): Prisma.Prisma__BenefitsClient<runtime.Types.Result.GetResult<Prisma.$BenefitsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BenefitsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BenefitsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BenefitsClient<runtime.Types.Result.GetResult<Prisma.$BenefitsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BenefitsFindManyArgs>(args?: Prisma.SelectSubset<T, BenefitsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BenefitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BenefitsCreateArgs>(args: Prisma.SelectSubset<T, BenefitsCreateArgs<ExtArgs>>): Prisma.Prisma__BenefitsClient<runtime.Types.Result.GetResult<Prisma.$BenefitsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BenefitsCreateManyArgs>(args?: Prisma.SelectSubset<T, BenefitsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BenefitsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BenefitsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BenefitsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BenefitsDeleteArgs>(args: Prisma.SelectSubset<T, BenefitsDeleteArgs<ExtArgs>>): Prisma.Prisma__BenefitsClient<runtime.Types.Result.GetResult<Prisma.$BenefitsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BenefitsUpdateArgs>(args: Prisma.SelectSubset<T, BenefitsUpdateArgs<ExtArgs>>): Prisma.Prisma__BenefitsClient<runtime.Types.Result.GetResult<Prisma.$BenefitsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BenefitsDeleteManyArgs>(args?: Prisma.SelectSubset<T, BenefitsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BenefitsUpdateManyArgs>(args: Prisma.SelectSubset<T, BenefitsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BenefitsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BenefitsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BenefitsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BenefitsUpsertArgs>(args: Prisma.SelectSubset<T, BenefitsUpsertArgs<ExtArgs>>): Prisma.Prisma__BenefitsClient<runtime.Types.Result.GetResult<Prisma.$BenefitsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BenefitsCountArgs>(args?: Prisma.Subset<T, BenefitsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BenefitsCountAggregateOutputType> : number>;
    aggregate<T extends BenefitsAggregateArgs>(args: Prisma.Subset<T, BenefitsAggregateArgs>): Prisma.PrismaPromise<GetBenefitsAggregateType<T>>;
    groupBy<T extends BenefitsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BenefitsGroupByArgs['orderBy'];
    } : {
        orderBy?: BenefitsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BenefitsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBenefitsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BenefitsFieldRefs;
}
export interface Prisma__BenefitsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    plans<T extends Prisma.Benefits$plansArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Benefits$plansArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BenefitsFieldRefs {
    readonly id: Prisma.FieldRef<"Benefits", 'String'>;
    readonly name: Prisma.FieldRef<"Benefits", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Benefits", 'DateTime'>;
}
export type BenefitsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BenefitsSelect<ExtArgs> | null;
    omit?: Prisma.BenefitsOmit<ExtArgs> | null;
    include?: Prisma.BenefitsInclude<ExtArgs> | null;
    where: Prisma.BenefitsWhereUniqueInput;
};
export type BenefitsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BenefitsSelect<ExtArgs> | null;
    omit?: Prisma.BenefitsOmit<ExtArgs> | null;
    include?: Prisma.BenefitsInclude<ExtArgs> | null;
    where: Prisma.BenefitsWhereUniqueInput;
};
export type BenefitsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BenefitsSelect<ExtArgs> | null;
    omit?: Prisma.BenefitsOmit<ExtArgs> | null;
    include?: Prisma.BenefitsInclude<ExtArgs> | null;
    where?: Prisma.BenefitsWhereInput;
    orderBy?: Prisma.BenefitsOrderByWithRelationInput | Prisma.BenefitsOrderByWithRelationInput[];
    cursor?: Prisma.BenefitsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BenefitsScalarFieldEnum | Prisma.BenefitsScalarFieldEnum[];
};
export type BenefitsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BenefitsSelect<ExtArgs> | null;
    omit?: Prisma.BenefitsOmit<ExtArgs> | null;
    include?: Prisma.BenefitsInclude<ExtArgs> | null;
    where?: Prisma.BenefitsWhereInput;
    orderBy?: Prisma.BenefitsOrderByWithRelationInput | Prisma.BenefitsOrderByWithRelationInput[];
    cursor?: Prisma.BenefitsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BenefitsScalarFieldEnum | Prisma.BenefitsScalarFieldEnum[];
};
export type BenefitsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BenefitsSelect<ExtArgs> | null;
    omit?: Prisma.BenefitsOmit<ExtArgs> | null;
    include?: Prisma.BenefitsInclude<ExtArgs> | null;
    where?: Prisma.BenefitsWhereInput;
    orderBy?: Prisma.BenefitsOrderByWithRelationInput | Prisma.BenefitsOrderByWithRelationInput[];
    cursor?: Prisma.BenefitsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BenefitsScalarFieldEnum | Prisma.BenefitsScalarFieldEnum[];
};
export type BenefitsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BenefitsSelect<ExtArgs> | null;
    omit?: Prisma.BenefitsOmit<ExtArgs> | null;
    include?: Prisma.BenefitsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BenefitsCreateInput, Prisma.BenefitsUncheckedCreateInput>;
};
export type BenefitsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BenefitsCreateManyInput | Prisma.BenefitsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BenefitsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BenefitsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BenefitsOmit<ExtArgs> | null;
    data: Prisma.BenefitsCreateManyInput | Prisma.BenefitsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BenefitsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BenefitsSelect<ExtArgs> | null;
    omit?: Prisma.BenefitsOmit<ExtArgs> | null;
    include?: Prisma.BenefitsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BenefitsUpdateInput, Prisma.BenefitsUncheckedUpdateInput>;
    where: Prisma.BenefitsWhereUniqueInput;
};
export type BenefitsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BenefitsUpdateManyMutationInput, Prisma.BenefitsUncheckedUpdateManyInput>;
    where?: Prisma.BenefitsWhereInput;
    limit?: number;
};
export type BenefitsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BenefitsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BenefitsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BenefitsUpdateManyMutationInput, Prisma.BenefitsUncheckedUpdateManyInput>;
    where?: Prisma.BenefitsWhereInput;
    limit?: number;
};
export type BenefitsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BenefitsSelect<ExtArgs> | null;
    omit?: Prisma.BenefitsOmit<ExtArgs> | null;
    include?: Prisma.BenefitsInclude<ExtArgs> | null;
    where: Prisma.BenefitsWhereUniqueInput;
    create: Prisma.XOR<Prisma.BenefitsCreateInput, Prisma.BenefitsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BenefitsUpdateInput, Prisma.BenefitsUncheckedUpdateInput>;
};
export type BenefitsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BenefitsSelect<ExtArgs> | null;
    omit?: Prisma.BenefitsOmit<ExtArgs> | null;
    include?: Prisma.BenefitsInclude<ExtArgs> | null;
    where: Prisma.BenefitsWhereUniqueInput;
};
export type BenefitsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BenefitsWhereInput;
    limit?: number;
};
export type Benefits$plansArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanBenefitsSelect<ExtArgs> | null;
    omit?: Prisma.PlanBenefitsOmit<ExtArgs> | null;
    include?: Prisma.PlanBenefitsInclude<ExtArgs> | null;
    where?: Prisma.PlanBenefitsWhereInput;
    orderBy?: Prisma.PlanBenefitsOrderByWithRelationInput | Prisma.PlanBenefitsOrderByWithRelationInput[];
    cursor?: Prisma.PlanBenefitsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlanBenefitsScalarFieldEnum | Prisma.PlanBenefitsScalarFieldEnum[];
};
export type BenefitsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BenefitsSelect<ExtArgs> | null;
    omit?: Prisma.BenefitsOmit<ExtArgs> | null;
    include?: Prisma.BenefitsInclude<ExtArgs> | null;
};
