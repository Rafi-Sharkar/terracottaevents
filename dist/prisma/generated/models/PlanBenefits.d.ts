import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PlanBenefitsModel = runtime.Types.Result.DefaultSelection<Prisma.$PlanBenefitsPayload>;
export type AggregatePlanBenefits = {
    _count: PlanBenefitsCountAggregateOutputType | null;
    _min: PlanBenefitsMinAggregateOutputType | null;
    _max: PlanBenefitsMaxAggregateOutputType | null;
};
export type PlanBenefitsMinAggregateOutputType = {
    id: string | null;
    planId: string | null;
    BenefitsId: string | null;
};
export type PlanBenefitsMaxAggregateOutputType = {
    id: string | null;
    planId: string | null;
    BenefitsId: string | null;
};
export type PlanBenefitsCountAggregateOutputType = {
    id: number;
    planId: number;
    BenefitsId: number;
    _all: number;
};
export type PlanBenefitsMinAggregateInputType = {
    id?: true;
    planId?: true;
    BenefitsId?: true;
};
export type PlanBenefitsMaxAggregateInputType = {
    id?: true;
    planId?: true;
    BenefitsId?: true;
};
export type PlanBenefitsCountAggregateInputType = {
    id?: true;
    planId?: true;
    BenefitsId?: true;
    _all?: true;
};
export type PlanBenefitsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlanBenefitsWhereInput;
    orderBy?: Prisma.PlanBenefitsOrderByWithRelationInput | Prisma.PlanBenefitsOrderByWithRelationInput[];
    cursor?: Prisma.PlanBenefitsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PlanBenefitsCountAggregateInputType;
    _min?: PlanBenefitsMinAggregateInputType;
    _max?: PlanBenefitsMaxAggregateInputType;
};
export type GetPlanBenefitsAggregateType<T extends PlanBenefitsAggregateArgs> = {
    [P in keyof T & keyof AggregatePlanBenefits]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePlanBenefits[P]> : Prisma.GetScalarType<T[P], AggregatePlanBenefits[P]>;
};
export type PlanBenefitsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlanBenefitsWhereInput;
    orderBy?: Prisma.PlanBenefitsOrderByWithAggregationInput | Prisma.PlanBenefitsOrderByWithAggregationInput[];
    by: Prisma.PlanBenefitsScalarFieldEnum[] | Prisma.PlanBenefitsScalarFieldEnum;
    having?: Prisma.PlanBenefitsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PlanBenefitsCountAggregateInputType | true;
    _min?: PlanBenefitsMinAggregateInputType;
    _max?: PlanBenefitsMaxAggregateInputType;
};
export type PlanBenefitsGroupByOutputType = {
    id: string;
    planId: string;
    BenefitsId: string;
    _count: PlanBenefitsCountAggregateOutputType | null;
    _min: PlanBenefitsMinAggregateOutputType | null;
    _max: PlanBenefitsMaxAggregateOutputType | null;
};
export type GetPlanBenefitsGroupByPayload<T extends PlanBenefitsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PlanBenefitsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PlanBenefitsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PlanBenefitsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PlanBenefitsGroupByOutputType[P]>;
}>>;
export type PlanBenefitsWhereInput = {
    AND?: Prisma.PlanBenefitsWhereInput | Prisma.PlanBenefitsWhereInput[];
    OR?: Prisma.PlanBenefitsWhereInput[];
    NOT?: Prisma.PlanBenefitsWhereInput | Prisma.PlanBenefitsWhereInput[];
    id?: Prisma.StringFilter<"PlanBenefits"> | string;
    planId?: Prisma.StringFilter<"PlanBenefits"> | string;
    BenefitsId?: Prisma.StringFilter<"PlanBenefits"> | string;
    plan?: Prisma.XOR<Prisma.PlanScalarRelationFilter, Prisma.PlanWhereInput>;
    Benefits?: Prisma.XOR<Prisma.BenefitsScalarRelationFilter, Prisma.BenefitsWhereInput>;
};
export type PlanBenefitsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    BenefitsId?: Prisma.SortOrder;
    plan?: Prisma.PlanOrderByWithRelationInput;
    Benefits?: Prisma.BenefitsOrderByWithRelationInput;
};
export type PlanBenefitsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    planId_BenefitsId?: Prisma.PlanBenefitsPlanIdBenefitsIdCompoundUniqueInput;
    AND?: Prisma.PlanBenefitsWhereInput | Prisma.PlanBenefitsWhereInput[];
    OR?: Prisma.PlanBenefitsWhereInput[];
    NOT?: Prisma.PlanBenefitsWhereInput | Prisma.PlanBenefitsWhereInput[];
    planId?: Prisma.StringFilter<"PlanBenefits"> | string;
    BenefitsId?: Prisma.StringFilter<"PlanBenefits"> | string;
    plan?: Prisma.XOR<Prisma.PlanScalarRelationFilter, Prisma.PlanWhereInput>;
    Benefits?: Prisma.XOR<Prisma.BenefitsScalarRelationFilter, Prisma.BenefitsWhereInput>;
}, "id" | "planId_BenefitsId">;
export type PlanBenefitsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    BenefitsId?: Prisma.SortOrder;
    _count?: Prisma.PlanBenefitsCountOrderByAggregateInput;
    _max?: Prisma.PlanBenefitsMaxOrderByAggregateInput;
    _min?: Prisma.PlanBenefitsMinOrderByAggregateInput;
};
export type PlanBenefitsScalarWhereWithAggregatesInput = {
    AND?: Prisma.PlanBenefitsScalarWhereWithAggregatesInput | Prisma.PlanBenefitsScalarWhereWithAggregatesInput[];
    OR?: Prisma.PlanBenefitsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PlanBenefitsScalarWhereWithAggregatesInput | Prisma.PlanBenefitsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PlanBenefits"> | string;
    planId?: Prisma.StringWithAggregatesFilter<"PlanBenefits"> | string;
    BenefitsId?: Prisma.StringWithAggregatesFilter<"PlanBenefits"> | string;
};
export type PlanBenefitsCreateInput = {
    id?: string;
    plan: Prisma.PlanCreateNestedOneWithoutBenefitssInput;
    Benefits: Prisma.BenefitsCreateNestedOneWithoutPlansInput;
};
export type PlanBenefitsUncheckedCreateInput = {
    id?: string;
    planId: string;
    BenefitsId: string;
};
export type PlanBenefitsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plan?: Prisma.PlanUpdateOneRequiredWithoutBenefitssNestedInput;
    Benefits?: Prisma.BenefitsUpdateOneRequiredWithoutPlansNestedInput;
};
export type PlanBenefitsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.StringFieldUpdateOperationsInput | string;
    BenefitsId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PlanBenefitsCreateManyInput = {
    id?: string;
    planId: string;
    BenefitsId: string;
};
export type PlanBenefitsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PlanBenefitsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.StringFieldUpdateOperationsInput | string;
    BenefitsId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PlanBenefitsListRelationFilter = {
    every?: Prisma.PlanBenefitsWhereInput;
    some?: Prisma.PlanBenefitsWhereInput;
    none?: Prisma.PlanBenefitsWhereInput;
};
export type PlanBenefitsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PlanBenefitsPlanIdBenefitsIdCompoundUniqueInput = {
    planId: string;
    BenefitsId: string;
};
export type PlanBenefitsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    BenefitsId?: Prisma.SortOrder;
};
export type PlanBenefitsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    BenefitsId?: Prisma.SortOrder;
};
export type PlanBenefitsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    BenefitsId?: Prisma.SortOrder;
};
export type PlanBenefitsCreateNestedManyWithoutPlanInput = {
    create?: Prisma.XOR<Prisma.PlanBenefitsCreateWithoutPlanInput, Prisma.PlanBenefitsUncheckedCreateWithoutPlanInput> | Prisma.PlanBenefitsCreateWithoutPlanInput[] | Prisma.PlanBenefitsUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.PlanBenefitsCreateOrConnectWithoutPlanInput | Prisma.PlanBenefitsCreateOrConnectWithoutPlanInput[];
    createMany?: Prisma.PlanBenefitsCreateManyPlanInputEnvelope;
    connect?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
};
export type PlanBenefitsUncheckedCreateNestedManyWithoutPlanInput = {
    create?: Prisma.XOR<Prisma.PlanBenefitsCreateWithoutPlanInput, Prisma.PlanBenefitsUncheckedCreateWithoutPlanInput> | Prisma.PlanBenefitsCreateWithoutPlanInput[] | Prisma.PlanBenefitsUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.PlanBenefitsCreateOrConnectWithoutPlanInput | Prisma.PlanBenefitsCreateOrConnectWithoutPlanInput[];
    createMany?: Prisma.PlanBenefitsCreateManyPlanInputEnvelope;
    connect?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
};
export type PlanBenefitsUpdateManyWithoutPlanNestedInput = {
    create?: Prisma.XOR<Prisma.PlanBenefitsCreateWithoutPlanInput, Prisma.PlanBenefitsUncheckedCreateWithoutPlanInput> | Prisma.PlanBenefitsCreateWithoutPlanInput[] | Prisma.PlanBenefitsUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.PlanBenefitsCreateOrConnectWithoutPlanInput | Prisma.PlanBenefitsCreateOrConnectWithoutPlanInput[];
    upsert?: Prisma.PlanBenefitsUpsertWithWhereUniqueWithoutPlanInput | Prisma.PlanBenefitsUpsertWithWhereUniqueWithoutPlanInput[];
    createMany?: Prisma.PlanBenefitsCreateManyPlanInputEnvelope;
    set?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    disconnect?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    delete?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    connect?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    update?: Prisma.PlanBenefitsUpdateWithWhereUniqueWithoutPlanInput | Prisma.PlanBenefitsUpdateWithWhereUniqueWithoutPlanInput[];
    updateMany?: Prisma.PlanBenefitsUpdateManyWithWhereWithoutPlanInput | Prisma.PlanBenefitsUpdateManyWithWhereWithoutPlanInput[];
    deleteMany?: Prisma.PlanBenefitsScalarWhereInput | Prisma.PlanBenefitsScalarWhereInput[];
};
export type PlanBenefitsUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: Prisma.XOR<Prisma.PlanBenefitsCreateWithoutPlanInput, Prisma.PlanBenefitsUncheckedCreateWithoutPlanInput> | Prisma.PlanBenefitsCreateWithoutPlanInput[] | Prisma.PlanBenefitsUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.PlanBenefitsCreateOrConnectWithoutPlanInput | Prisma.PlanBenefitsCreateOrConnectWithoutPlanInput[];
    upsert?: Prisma.PlanBenefitsUpsertWithWhereUniqueWithoutPlanInput | Prisma.PlanBenefitsUpsertWithWhereUniqueWithoutPlanInput[];
    createMany?: Prisma.PlanBenefitsCreateManyPlanInputEnvelope;
    set?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    disconnect?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    delete?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    connect?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    update?: Prisma.PlanBenefitsUpdateWithWhereUniqueWithoutPlanInput | Prisma.PlanBenefitsUpdateWithWhereUniqueWithoutPlanInput[];
    updateMany?: Prisma.PlanBenefitsUpdateManyWithWhereWithoutPlanInput | Prisma.PlanBenefitsUpdateManyWithWhereWithoutPlanInput[];
    deleteMany?: Prisma.PlanBenefitsScalarWhereInput | Prisma.PlanBenefitsScalarWhereInput[];
};
export type PlanBenefitsCreateNestedManyWithoutBenefitsInput = {
    create?: Prisma.XOR<Prisma.PlanBenefitsCreateWithoutBenefitsInput, Prisma.PlanBenefitsUncheckedCreateWithoutBenefitsInput> | Prisma.PlanBenefitsCreateWithoutBenefitsInput[] | Prisma.PlanBenefitsUncheckedCreateWithoutBenefitsInput[];
    connectOrCreate?: Prisma.PlanBenefitsCreateOrConnectWithoutBenefitsInput | Prisma.PlanBenefitsCreateOrConnectWithoutBenefitsInput[];
    createMany?: Prisma.PlanBenefitsCreateManyBenefitsInputEnvelope;
    connect?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
};
export type PlanBenefitsUncheckedCreateNestedManyWithoutBenefitsInput = {
    create?: Prisma.XOR<Prisma.PlanBenefitsCreateWithoutBenefitsInput, Prisma.PlanBenefitsUncheckedCreateWithoutBenefitsInput> | Prisma.PlanBenefitsCreateWithoutBenefitsInput[] | Prisma.PlanBenefitsUncheckedCreateWithoutBenefitsInput[];
    connectOrCreate?: Prisma.PlanBenefitsCreateOrConnectWithoutBenefitsInput | Prisma.PlanBenefitsCreateOrConnectWithoutBenefitsInput[];
    createMany?: Prisma.PlanBenefitsCreateManyBenefitsInputEnvelope;
    connect?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
};
export type PlanBenefitsUpdateManyWithoutBenefitsNestedInput = {
    create?: Prisma.XOR<Prisma.PlanBenefitsCreateWithoutBenefitsInput, Prisma.PlanBenefitsUncheckedCreateWithoutBenefitsInput> | Prisma.PlanBenefitsCreateWithoutBenefitsInput[] | Prisma.PlanBenefitsUncheckedCreateWithoutBenefitsInput[];
    connectOrCreate?: Prisma.PlanBenefitsCreateOrConnectWithoutBenefitsInput | Prisma.PlanBenefitsCreateOrConnectWithoutBenefitsInput[];
    upsert?: Prisma.PlanBenefitsUpsertWithWhereUniqueWithoutBenefitsInput | Prisma.PlanBenefitsUpsertWithWhereUniqueWithoutBenefitsInput[];
    createMany?: Prisma.PlanBenefitsCreateManyBenefitsInputEnvelope;
    set?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    disconnect?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    delete?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    connect?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    update?: Prisma.PlanBenefitsUpdateWithWhereUniqueWithoutBenefitsInput | Prisma.PlanBenefitsUpdateWithWhereUniqueWithoutBenefitsInput[];
    updateMany?: Prisma.PlanBenefitsUpdateManyWithWhereWithoutBenefitsInput | Prisma.PlanBenefitsUpdateManyWithWhereWithoutBenefitsInput[];
    deleteMany?: Prisma.PlanBenefitsScalarWhereInput | Prisma.PlanBenefitsScalarWhereInput[];
};
export type PlanBenefitsUncheckedUpdateManyWithoutBenefitsNestedInput = {
    create?: Prisma.XOR<Prisma.PlanBenefitsCreateWithoutBenefitsInput, Prisma.PlanBenefitsUncheckedCreateWithoutBenefitsInput> | Prisma.PlanBenefitsCreateWithoutBenefitsInput[] | Prisma.PlanBenefitsUncheckedCreateWithoutBenefitsInput[];
    connectOrCreate?: Prisma.PlanBenefitsCreateOrConnectWithoutBenefitsInput | Prisma.PlanBenefitsCreateOrConnectWithoutBenefitsInput[];
    upsert?: Prisma.PlanBenefitsUpsertWithWhereUniqueWithoutBenefitsInput | Prisma.PlanBenefitsUpsertWithWhereUniqueWithoutBenefitsInput[];
    createMany?: Prisma.PlanBenefitsCreateManyBenefitsInputEnvelope;
    set?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    disconnect?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    delete?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    connect?: Prisma.PlanBenefitsWhereUniqueInput | Prisma.PlanBenefitsWhereUniqueInput[];
    update?: Prisma.PlanBenefitsUpdateWithWhereUniqueWithoutBenefitsInput | Prisma.PlanBenefitsUpdateWithWhereUniqueWithoutBenefitsInput[];
    updateMany?: Prisma.PlanBenefitsUpdateManyWithWhereWithoutBenefitsInput | Prisma.PlanBenefitsUpdateManyWithWhereWithoutBenefitsInput[];
    deleteMany?: Prisma.PlanBenefitsScalarWhereInput | Prisma.PlanBenefitsScalarWhereInput[];
};
export type PlanBenefitsCreateWithoutPlanInput = {
    id?: string;
    Benefits: Prisma.BenefitsCreateNestedOneWithoutPlansInput;
};
export type PlanBenefitsUncheckedCreateWithoutPlanInput = {
    id?: string;
    BenefitsId: string;
};
export type PlanBenefitsCreateOrConnectWithoutPlanInput = {
    where: Prisma.PlanBenefitsWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlanBenefitsCreateWithoutPlanInput, Prisma.PlanBenefitsUncheckedCreateWithoutPlanInput>;
};
export type PlanBenefitsCreateManyPlanInputEnvelope = {
    data: Prisma.PlanBenefitsCreateManyPlanInput | Prisma.PlanBenefitsCreateManyPlanInput[];
    skipDuplicates?: boolean;
};
export type PlanBenefitsUpsertWithWhereUniqueWithoutPlanInput = {
    where: Prisma.PlanBenefitsWhereUniqueInput;
    update: Prisma.XOR<Prisma.PlanBenefitsUpdateWithoutPlanInput, Prisma.PlanBenefitsUncheckedUpdateWithoutPlanInput>;
    create: Prisma.XOR<Prisma.PlanBenefitsCreateWithoutPlanInput, Prisma.PlanBenefitsUncheckedCreateWithoutPlanInput>;
};
export type PlanBenefitsUpdateWithWhereUniqueWithoutPlanInput = {
    where: Prisma.PlanBenefitsWhereUniqueInput;
    data: Prisma.XOR<Prisma.PlanBenefitsUpdateWithoutPlanInput, Prisma.PlanBenefitsUncheckedUpdateWithoutPlanInput>;
};
export type PlanBenefitsUpdateManyWithWhereWithoutPlanInput = {
    where: Prisma.PlanBenefitsScalarWhereInput;
    data: Prisma.XOR<Prisma.PlanBenefitsUpdateManyMutationInput, Prisma.PlanBenefitsUncheckedUpdateManyWithoutPlanInput>;
};
export type PlanBenefitsScalarWhereInput = {
    AND?: Prisma.PlanBenefitsScalarWhereInput | Prisma.PlanBenefitsScalarWhereInput[];
    OR?: Prisma.PlanBenefitsScalarWhereInput[];
    NOT?: Prisma.PlanBenefitsScalarWhereInput | Prisma.PlanBenefitsScalarWhereInput[];
    id?: Prisma.StringFilter<"PlanBenefits"> | string;
    planId?: Prisma.StringFilter<"PlanBenefits"> | string;
    BenefitsId?: Prisma.StringFilter<"PlanBenefits"> | string;
};
export type PlanBenefitsCreateWithoutBenefitsInput = {
    id?: string;
    plan: Prisma.PlanCreateNestedOneWithoutBenefitssInput;
};
export type PlanBenefitsUncheckedCreateWithoutBenefitsInput = {
    id?: string;
    planId: string;
};
export type PlanBenefitsCreateOrConnectWithoutBenefitsInput = {
    where: Prisma.PlanBenefitsWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlanBenefitsCreateWithoutBenefitsInput, Prisma.PlanBenefitsUncheckedCreateWithoutBenefitsInput>;
};
export type PlanBenefitsCreateManyBenefitsInputEnvelope = {
    data: Prisma.PlanBenefitsCreateManyBenefitsInput | Prisma.PlanBenefitsCreateManyBenefitsInput[];
    skipDuplicates?: boolean;
};
export type PlanBenefitsUpsertWithWhereUniqueWithoutBenefitsInput = {
    where: Prisma.PlanBenefitsWhereUniqueInput;
    update: Prisma.XOR<Prisma.PlanBenefitsUpdateWithoutBenefitsInput, Prisma.PlanBenefitsUncheckedUpdateWithoutBenefitsInput>;
    create: Prisma.XOR<Prisma.PlanBenefitsCreateWithoutBenefitsInput, Prisma.PlanBenefitsUncheckedCreateWithoutBenefitsInput>;
};
export type PlanBenefitsUpdateWithWhereUniqueWithoutBenefitsInput = {
    where: Prisma.PlanBenefitsWhereUniqueInput;
    data: Prisma.XOR<Prisma.PlanBenefitsUpdateWithoutBenefitsInput, Prisma.PlanBenefitsUncheckedUpdateWithoutBenefitsInput>;
};
export type PlanBenefitsUpdateManyWithWhereWithoutBenefitsInput = {
    where: Prisma.PlanBenefitsScalarWhereInput;
    data: Prisma.XOR<Prisma.PlanBenefitsUpdateManyMutationInput, Prisma.PlanBenefitsUncheckedUpdateManyWithoutBenefitsInput>;
};
export type PlanBenefitsCreateManyPlanInput = {
    id?: string;
    BenefitsId: string;
};
export type PlanBenefitsUpdateWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    Benefits?: Prisma.BenefitsUpdateOneRequiredWithoutPlansNestedInput;
};
export type PlanBenefitsUncheckedUpdateWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    BenefitsId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PlanBenefitsUncheckedUpdateManyWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    BenefitsId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PlanBenefitsCreateManyBenefitsInput = {
    id?: string;
    planId: string;
};
export type PlanBenefitsUpdateWithoutBenefitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plan?: Prisma.PlanUpdateOneRequiredWithoutBenefitssNestedInput;
};
export type PlanBenefitsUncheckedUpdateWithoutBenefitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PlanBenefitsUncheckedUpdateManyWithoutBenefitsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PlanBenefitsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    planId?: boolean;
    BenefitsId?: boolean;
    plan?: boolean | Prisma.PlanDefaultArgs<ExtArgs>;
    Benefits?: boolean | Prisma.BenefitsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["planBenefits"]>;
export type PlanBenefitsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    planId?: boolean;
    BenefitsId?: boolean;
    plan?: boolean | Prisma.PlanDefaultArgs<ExtArgs>;
    Benefits?: boolean | Prisma.BenefitsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["planBenefits"]>;
export type PlanBenefitsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    planId?: boolean;
    BenefitsId?: boolean;
    plan?: boolean | Prisma.PlanDefaultArgs<ExtArgs>;
    Benefits?: boolean | Prisma.BenefitsDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["planBenefits"]>;
export type PlanBenefitsSelectScalar = {
    id?: boolean;
    planId?: boolean;
    BenefitsId?: boolean;
};
export type PlanBenefitsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "planId" | "BenefitsId", ExtArgs["result"]["planBenefits"]>;
export type PlanBenefitsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plan?: boolean | Prisma.PlanDefaultArgs<ExtArgs>;
    Benefits?: boolean | Prisma.BenefitsDefaultArgs<ExtArgs>;
};
export type PlanBenefitsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plan?: boolean | Prisma.PlanDefaultArgs<ExtArgs>;
    Benefits?: boolean | Prisma.BenefitsDefaultArgs<ExtArgs>;
};
export type PlanBenefitsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plan?: boolean | Prisma.PlanDefaultArgs<ExtArgs>;
    Benefits?: boolean | Prisma.BenefitsDefaultArgs<ExtArgs>;
};
export type $PlanBenefitsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PlanBenefits";
    objects: {
        plan: Prisma.$PlanPayload<ExtArgs>;
        Benefits: Prisma.$BenefitsPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        planId: string;
        BenefitsId: string;
    }, ExtArgs["result"]["planBenefits"]>;
    composites: {};
};
export type PlanBenefitsGetPayload<S extends boolean | null | undefined | PlanBenefitsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload, S>;
export type PlanBenefitsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PlanBenefitsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PlanBenefitsCountAggregateInputType | true;
};
export interface PlanBenefitsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PlanBenefits'];
        meta: {
            name: 'PlanBenefits';
        };
    };
    findUnique<T extends PlanBenefitsFindUniqueArgs>(args: Prisma.SelectSubset<T, PlanBenefitsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PlanBenefitsClient<runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PlanBenefitsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PlanBenefitsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlanBenefitsClient<runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PlanBenefitsFindFirstArgs>(args?: Prisma.SelectSubset<T, PlanBenefitsFindFirstArgs<ExtArgs>>): Prisma.Prisma__PlanBenefitsClient<runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PlanBenefitsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PlanBenefitsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlanBenefitsClient<runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PlanBenefitsFindManyArgs>(args?: Prisma.SelectSubset<T, PlanBenefitsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PlanBenefitsCreateArgs>(args: Prisma.SelectSubset<T, PlanBenefitsCreateArgs<ExtArgs>>): Prisma.Prisma__PlanBenefitsClient<runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PlanBenefitsCreateManyArgs>(args?: Prisma.SelectSubset<T, PlanBenefitsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PlanBenefitsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PlanBenefitsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PlanBenefitsDeleteArgs>(args: Prisma.SelectSubset<T, PlanBenefitsDeleteArgs<ExtArgs>>): Prisma.Prisma__PlanBenefitsClient<runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PlanBenefitsUpdateArgs>(args: Prisma.SelectSubset<T, PlanBenefitsUpdateArgs<ExtArgs>>): Prisma.Prisma__PlanBenefitsClient<runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PlanBenefitsDeleteManyArgs>(args?: Prisma.SelectSubset<T, PlanBenefitsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PlanBenefitsUpdateManyArgs>(args: Prisma.SelectSubset<T, PlanBenefitsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PlanBenefitsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PlanBenefitsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PlanBenefitsUpsertArgs>(args: Prisma.SelectSubset<T, PlanBenefitsUpsertArgs<ExtArgs>>): Prisma.Prisma__PlanBenefitsClient<runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PlanBenefitsCountArgs>(args?: Prisma.Subset<T, PlanBenefitsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PlanBenefitsCountAggregateOutputType> : number>;
    aggregate<T extends PlanBenefitsAggregateArgs>(args: Prisma.Subset<T, PlanBenefitsAggregateArgs>): Prisma.PrismaPromise<GetPlanBenefitsAggregateType<T>>;
    groupBy<T extends PlanBenefitsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PlanBenefitsGroupByArgs['orderBy'];
    } : {
        orderBy?: PlanBenefitsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PlanBenefitsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanBenefitsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PlanBenefitsFieldRefs;
}
export interface Prisma__PlanBenefitsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    plan<T extends Prisma.PlanDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PlanDefaultArgs<ExtArgs>>): Prisma.Prisma__PlanClient<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    Benefits<T extends Prisma.BenefitsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BenefitsDefaultArgs<ExtArgs>>): Prisma.Prisma__BenefitsClient<runtime.Types.Result.GetResult<Prisma.$BenefitsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PlanBenefitsFieldRefs {
    readonly id: Prisma.FieldRef<"PlanBenefits", 'String'>;
    readonly planId: Prisma.FieldRef<"PlanBenefits", 'String'>;
    readonly BenefitsId: Prisma.FieldRef<"PlanBenefits", 'String'>;
}
export type PlanBenefitsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanBenefitsSelect<ExtArgs> | null;
    omit?: Prisma.PlanBenefitsOmit<ExtArgs> | null;
    include?: Prisma.PlanBenefitsInclude<ExtArgs> | null;
    where: Prisma.PlanBenefitsWhereUniqueInput;
};
export type PlanBenefitsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanBenefitsSelect<ExtArgs> | null;
    omit?: Prisma.PlanBenefitsOmit<ExtArgs> | null;
    include?: Prisma.PlanBenefitsInclude<ExtArgs> | null;
    where: Prisma.PlanBenefitsWhereUniqueInput;
};
export type PlanBenefitsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PlanBenefitsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PlanBenefitsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PlanBenefitsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanBenefitsSelect<ExtArgs> | null;
    omit?: Prisma.PlanBenefitsOmit<ExtArgs> | null;
    include?: Prisma.PlanBenefitsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlanBenefitsCreateInput, Prisma.PlanBenefitsUncheckedCreateInput>;
};
export type PlanBenefitsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PlanBenefitsCreateManyInput | Prisma.PlanBenefitsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PlanBenefitsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanBenefitsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PlanBenefitsOmit<ExtArgs> | null;
    data: Prisma.PlanBenefitsCreateManyInput | Prisma.PlanBenefitsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PlanBenefitsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PlanBenefitsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanBenefitsSelect<ExtArgs> | null;
    omit?: Prisma.PlanBenefitsOmit<ExtArgs> | null;
    include?: Prisma.PlanBenefitsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlanBenefitsUpdateInput, Prisma.PlanBenefitsUncheckedUpdateInput>;
    where: Prisma.PlanBenefitsWhereUniqueInput;
};
export type PlanBenefitsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PlanBenefitsUpdateManyMutationInput, Prisma.PlanBenefitsUncheckedUpdateManyInput>;
    where?: Prisma.PlanBenefitsWhereInput;
    limit?: number;
};
export type PlanBenefitsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanBenefitsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PlanBenefitsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlanBenefitsUpdateManyMutationInput, Prisma.PlanBenefitsUncheckedUpdateManyInput>;
    where?: Prisma.PlanBenefitsWhereInput;
    limit?: number;
    include?: Prisma.PlanBenefitsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PlanBenefitsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanBenefitsSelect<ExtArgs> | null;
    omit?: Prisma.PlanBenefitsOmit<ExtArgs> | null;
    include?: Prisma.PlanBenefitsInclude<ExtArgs> | null;
    where: Prisma.PlanBenefitsWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlanBenefitsCreateInput, Prisma.PlanBenefitsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PlanBenefitsUpdateInput, Prisma.PlanBenefitsUncheckedUpdateInput>;
};
export type PlanBenefitsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanBenefitsSelect<ExtArgs> | null;
    omit?: Prisma.PlanBenefitsOmit<ExtArgs> | null;
    include?: Prisma.PlanBenefitsInclude<ExtArgs> | null;
    where: Prisma.PlanBenefitsWhereUniqueInput;
};
export type PlanBenefitsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlanBenefitsWhereInput;
    limit?: number;
};
export type PlanBenefitsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanBenefitsSelect<ExtArgs> | null;
    omit?: Prisma.PlanBenefitsOmit<ExtArgs> | null;
    include?: Prisma.PlanBenefitsInclude<ExtArgs> | null;
};
