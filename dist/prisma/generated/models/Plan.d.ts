import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type PlanModel = runtime.Types.Result.DefaultSelection<Prisma.$PlanPayload>;
export type AggregatePlan = {
    _count: PlanCountAggregateOutputType | null;
    _min: PlanMinAggregateOutputType | null;
    _max: PlanMaxAggregateOutputType | null;
};
export type PlanMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    price: string | null;
    isMostPopular: boolean | null;
    BillingCycle: $Enums.BillingCycle | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PlanMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    price: string | null;
    isMostPopular: boolean | null;
    BillingCycle: $Enums.BillingCycle | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PlanCountAggregateOutputType = {
    id: number;
    name: number;
    price: number;
    isMostPopular: number;
    BillingCycle: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PlanMinAggregateInputType = {
    id?: true;
    name?: true;
    price?: true;
    isMostPopular?: true;
    BillingCycle?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PlanMaxAggregateInputType = {
    id?: true;
    name?: true;
    price?: true;
    isMostPopular?: true;
    BillingCycle?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PlanCountAggregateInputType = {
    id?: true;
    name?: true;
    price?: true;
    isMostPopular?: true;
    BillingCycle?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PlanAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlanWhereInput;
    orderBy?: Prisma.PlanOrderByWithRelationInput | Prisma.PlanOrderByWithRelationInput[];
    cursor?: Prisma.PlanWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PlanCountAggregateInputType;
    _min?: PlanMinAggregateInputType;
    _max?: PlanMaxAggregateInputType;
};
export type GetPlanAggregateType<T extends PlanAggregateArgs> = {
    [P in keyof T & keyof AggregatePlan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePlan[P]> : Prisma.GetScalarType<T[P], AggregatePlan[P]>;
};
export type PlanGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlanWhereInput;
    orderBy?: Prisma.PlanOrderByWithAggregationInput | Prisma.PlanOrderByWithAggregationInput[];
    by: Prisma.PlanScalarFieldEnum[] | Prisma.PlanScalarFieldEnum;
    having?: Prisma.PlanScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PlanCountAggregateInputType | true;
    _min?: PlanMinAggregateInputType;
    _max?: PlanMaxAggregateInputType;
};
export type PlanGroupByOutputType = {
    id: string;
    name: string;
    price: string;
    isMostPopular: boolean;
    BillingCycle: $Enums.BillingCycle;
    createdAt: Date;
    updatedAt: Date;
    _count: PlanCountAggregateOutputType | null;
    _min: PlanMinAggregateOutputType | null;
    _max: PlanMaxAggregateOutputType | null;
};
export type GetPlanGroupByPayload<T extends PlanGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PlanGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PlanGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PlanGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PlanGroupByOutputType[P]>;
}>>;
export type PlanWhereInput = {
    AND?: Prisma.PlanWhereInput | Prisma.PlanWhereInput[];
    OR?: Prisma.PlanWhereInput[];
    NOT?: Prisma.PlanWhereInput | Prisma.PlanWhereInput[];
    id?: Prisma.StringFilter<"Plan"> | string;
    name?: Prisma.StringFilter<"Plan"> | string;
    price?: Prisma.StringFilter<"Plan"> | string;
    isMostPopular?: Prisma.BoolFilter<"Plan"> | boolean;
    BillingCycle?: Prisma.EnumBillingCycleFilter<"Plan"> | $Enums.BillingCycle;
    createdAt?: Prisma.DateTimeFilter<"Plan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Plan"> | Date | string;
    Benefitss?: Prisma.PlanBenefitsListRelationFilter;
    booking?: Prisma.BookingListRelationFilter;
};
export type PlanOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    isMostPopular?: Prisma.SortOrder;
    BillingCycle?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    Benefitss?: Prisma.PlanBenefitsOrderByRelationAggregateInput;
    booking?: Prisma.BookingOrderByRelationAggregateInput;
};
export type PlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.PlanWhereInput | Prisma.PlanWhereInput[];
    OR?: Prisma.PlanWhereInput[];
    NOT?: Prisma.PlanWhereInput | Prisma.PlanWhereInput[];
    price?: Prisma.StringFilter<"Plan"> | string;
    isMostPopular?: Prisma.BoolFilter<"Plan"> | boolean;
    BillingCycle?: Prisma.EnumBillingCycleFilter<"Plan"> | $Enums.BillingCycle;
    createdAt?: Prisma.DateTimeFilter<"Plan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Plan"> | Date | string;
    Benefitss?: Prisma.PlanBenefitsListRelationFilter;
    booking?: Prisma.BookingListRelationFilter;
}, "id" | "name">;
export type PlanOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    isMostPopular?: Prisma.SortOrder;
    BillingCycle?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PlanCountOrderByAggregateInput;
    _max?: Prisma.PlanMaxOrderByAggregateInput;
    _min?: Prisma.PlanMinOrderByAggregateInput;
};
export type PlanScalarWhereWithAggregatesInput = {
    AND?: Prisma.PlanScalarWhereWithAggregatesInput | Prisma.PlanScalarWhereWithAggregatesInput[];
    OR?: Prisma.PlanScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PlanScalarWhereWithAggregatesInput | Prisma.PlanScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Plan"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Plan"> | string;
    price?: Prisma.StringWithAggregatesFilter<"Plan"> | string;
    isMostPopular?: Prisma.BoolWithAggregatesFilter<"Plan"> | boolean;
    BillingCycle?: Prisma.EnumBillingCycleWithAggregatesFilter<"Plan"> | $Enums.BillingCycle;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Plan"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Plan"> | Date | string;
};
export type PlanCreateInput = {
    id?: string;
    name?: string;
    price?: string;
    isMostPopular?: boolean;
    BillingCycle?: $Enums.BillingCycle;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    Benefitss?: Prisma.PlanBenefitsCreateNestedManyWithoutPlanInput;
    booking?: Prisma.BookingCreateNestedManyWithoutPlanInput;
};
export type PlanUncheckedCreateInput = {
    id?: string;
    name?: string;
    price?: string;
    isMostPopular?: boolean;
    BillingCycle?: $Enums.BillingCycle;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    Benefitss?: Prisma.PlanBenefitsUncheckedCreateNestedManyWithoutPlanInput;
    booking?: Prisma.BookingUncheckedCreateNestedManyWithoutPlanInput;
};
export type PlanUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.StringFieldUpdateOperationsInput | string;
    isMostPopular?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    BillingCycle?: Prisma.EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Benefitss?: Prisma.PlanBenefitsUpdateManyWithoutPlanNestedInput;
    booking?: Prisma.BookingUpdateManyWithoutPlanNestedInput;
};
export type PlanUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.StringFieldUpdateOperationsInput | string;
    isMostPopular?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    BillingCycle?: Prisma.EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Benefitss?: Prisma.PlanBenefitsUncheckedUpdateManyWithoutPlanNestedInput;
    booking?: Prisma.BookingUncheckedUpdateManyWithoutPlanNestedInput;
};
export type PlanCreateManyInput = {
    id?: string;
    name?: string;
    price?: string;
    isMostPopular?: boolean;
    BillingCycle?: $Enums.BillingCycle;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PlanUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.StringFieldUpdateOperationsInput | string;
    isMostPopular?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    BillingCycle?: Prisma.EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlanUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.StringFieldUpdateOperationsInput | string;
    isMostPopular?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    BillingCycle?: Prisma.EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PlanCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    isMostPopular?: Prisma.SortOrder;
    BillingCycle?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PlanMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    isMostPopular?: Prisma.SortOrder;
    BillingCycle?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PlanMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    isMostPopular?: Prisma.SortOrder;
    BillingCycle?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PlanScalarRelationFilter = {
    is?: Prisma.PlanWhereInput;
    isNot?: Prisma.PlanWhereInput;
};
export type EnumBillingCycleFieldUpdateOperationsInput = {
    set?: $Enums.BillingCycle;
};
export type PlanCreateNestedOneWithoutBenefitssInput = {
    create?: Prisma.XOR<Prisma.PlanCreateWithoutBenefitssInput, Prisma.PlanUncheckedCreateWithoutBenefitssInput>;
    connectOrCreate?: Prisma.PlanCreateOrConnectWithoutBenefitssInput;
    connect?: Prisma.PlanWhereUniqueInput;
};
export type PlanUpdateOneRequiredWithoutBenefitssNestedInput = {
    create?: Prisma.XOR<Prisma.PlanCreateWithoutBenefitssInput, Prisma.PlanUncheckedCreateWithoutBenefitssInput>;
    connectOrCreate?: Prisma.PlanCreateOrConnectWithoutBenefitssInput;
    upsert?: Prisma.PlanUpsertWithoutBenefitssInput;
    connect?: Prisma.PlanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PlanUpdateToOneWithWhereWithoutBenefitssInput, Prisma.PlanUpdateWithoutBenefitssInput>, Prisma.PlanUncheckedUpdateWithoutBenefitssInput>;
};
export type PlanCreateNestedOneWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.PlanCreateWithoutBookingInput, Prisma.PlanUncheckedCreateWithoutBookingInput>;
    connectOrCreate?: Prisma.PlanCreateOrConnectWithoutBookingInput;
    connect?: Prisma.PlanWhereUniqueInput;
};
export type PlanUpdateOneRequiredWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.PlanCreateWithoutBookingInput, Prisma.PlanUncheckedCreateWithoutBookingInput>;
    connectOrCreate?: Prisma.PlanCreateOrConnectWithoutBookingInput;
    upsert?: Prisma.PlanUpsertWithoutBookingInput;
    connect?: Prisma.PlanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PlanUpdateToOneWithWhereWithoutBookingInput, Prisma.PlanUpdateWithoutBookingInput>, Prisma.PlanUncheckedUpdateWithoutBookingInput>;
};
export type PlanCreateWithoutBenefitssInput = {
    id?: string;
    name?: string;
    price?: string;
    isMostPopular?: boolean;
    BillingCycle?: $Enums.BillingCycle;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking?: Prisma.BookingCreateNestedManyWithoutPlanInput;
};
export type PlanUncheckedCreateWithoutBenefitssInput = {
    id?: string;
    name?: string;
    price?: string;
    isMostPopular?: boolean;
    BillingCycle?: $Enums.BillingCycle;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    booking?: Prisma.BookingUncheckedCreateNestedManyWithoutPlanInput;
};
export type PlanCreateOrConnectWithoutBenefitssInput = {
    where: Prisma.PlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlanCreateWithoutBenefitssInput, Prisma.PlanUncheckedCreateWithoutBenefitssInput>;
};
export type PlanUpsertWithoutBenefitssInput = {
    update: Prisma.XOR<Prisma.PlanUpdateWithoutBenefitssInput, Prisma.PlanUncheckedUpdateWithoutBenefitssInput>;
    create: Prisma.XOR<Prisma.PlanCreateWithoutBenefitssInput, Prisma.PlanUncheckedCreateWithoutBenefitssInput>;
    where?: Prisma.PlanWhereInput;
};
export type PlanUpdateToOneWithWhereWithoutBenefitssInput = {
    where?: Prisma.PlanWhereInput;
    data: Prisma.XOR<Prisma.PlanUpdateWithoutBenefitssInput, Prisma.PlanUncheckedUpdateWithoutBenefitssInput>;
};
export type PlanUpdateWithoutBenefitssInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.StringFieldUpdateOperationsInput | string;
    isMostPopular?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    BillingCycle?: Prisma.EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateManyWithoutPlanNestedInput;
};
export type PlanUncheckedUpdateWithoutBenefitssInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.StringFieldUpdateOperationsInput | string;
    isMostPopular?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    BillingCycle?: Prisma.EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUncheckedUpdateManyWithoutPlanNestedInput;
};
export type PlanCreateWithoutBookingInput = {
    id?: string;
    name?: string;
    price?: string;
    isMostPopular?: boolean;
    BillingCycle?: $Enums.BillingCycle;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    Benefitss?: Prisma.PlanBenefitsCreateNestedManyWithoutPlanInput;
};
export type PlanUncheckedCreateWithoutBookingInput = {
    id?: string;
    name?: string;
    price?: string;
    isMostPopular?: boolean;
    BillingCycle?: $Enums.BillingCycle;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    Benefitss?: Prisma.PlanBenefitsUncheckedCreateNestedManyWithoutPlanInput;
};
export type PlanCreateOrConnectWithoutBookingInput = {
    where: Prisma.PlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlanCreateWithoutBookingInput, Prisma.PlanUncheckedCreateWithoutBookingInput>;
};
export type PlanUpsertWithoutBookingInput = {
    update: Prisma.XOR<Prisma.PlanUpdateWithoutBookingInput, Prisma.PlanUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.PlanCreateWithoutBookingInput, Prisma.PlanUncheckedCreateWithoutBookingInput>;
    where?: Prisma.PlanWhereInput;
};
export type PlanUpdateToOneWithWhereWithoutBookingInput = {
    where?: Prisma.PlanWhereInput;
    data: Prisma.XOR<Prisma.PlanUpdateWithoutBookingInput, Prisma.PlanUncheckedUpdateWithoutBookingInput>;
};
export type PlanUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.StringFieldUpdateOperationsInput | string;
    isMostPopular?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    BillingCycle?: Prisma.EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Benefitss?: Prisma.PlanBenefitsUpdateManyWithoutPlanNestedInput;
};
export type PlanUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.StringFieldUpdateOperationsInput | string;
    isMostPopular?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    BillingCycle?: Prisma.EnumBillingCycleFieldUpdateOperationsInput | $Enums.BillingCycle;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Benefitss?: Prisma.PlanBenefitsUncheckedUpdateManyWithoutPlanNestedInput;
};
export type PlanCountOutputType = {
    Benefitss: number;
    booking: number;
};
export type PlanCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Benefitss?: boolean | PlanCountOutputTypeCountBenefitssArgs;
    booking?: boolean | PlanCountOutputTypeCountBookingArgs;
};
export type PlanCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanCountOutputTypeSelect<ExtArgs> | null;
};
export type PlanCountOutputTypeCountBenefitssArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlanBenefitsWhereInput;
};
export type PlanCountOutputTypeCountBookingArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type PlanSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    price?: boolean;
    isMostPopular?: boolean;
    BillingCycle?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    Benefitss?: boolean | Prisma.Plan$BenefitssArgs<ExtArgs>;
    booking?: boolean | Prisma.Plan$bookingArgs<ExtArgs>;
    _count?: boolean | Prisma.PlanCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["plan"]>;
export type PlanSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    price?: boolean;
    isMostPopular?: boolean;
    BillingCycle?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["plan"]>;
export type PlanSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    price?: boolean;
    isMostPopular?: boolean;
    BillingCycle?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["plan"]>;
export type PlanSelectScalar = {
    id?: boolean;
    name?: boolean;
    price?: boolean;
    isMostPopular?: boolean;
    BillingCycle?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PlanOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "price" | "isMostPopular" | "BillingCycle" | "createdAt" | "updatedAt", ExtArgs["result"]["plan"]>;
export type PlanInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Benefitss?: boolean | Prisma.Plan$BenefitssArgs<ExtArgs>;
    booking?: boolean | Prisma.Plan$bookingArgs<ExtArgs>;
    _count?: boolean | Prisma.PlanCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PlanIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type PlanIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $PlanPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Plan";
    objects: {
        Benefitss: Prisma.$PlanBenefitsPayload<ExtArgs>[];
        booking: Prisma.$BookingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        price: string;
        isMostPopular: boolean;
        BillingCycle: $Enums.BillingCycle;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["plan"]>;
    composites: {};
};
export type PlanGetPayload<S extends boolean | null | undefined | PlanDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PlanPayload, S>;
export type PlanCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PlanCountAggregateInputType | true;
};
export interface PlanDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Plan'];
        meta: {
            name: 'Plan';
        };
    };
    findUnique<T extends PlanFindUniqueArgs>(args: Prisma.SelectSubset<T, PlanFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PlanClient<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PlanFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlanClient<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PlanFindFirstArgs>(args?: Prisma.SelectSubset<T, PlanFindFirstArgs<ExtArgs>>): Prisma.Prisma__PlanClient<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PlanFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PlanFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlanClient<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PlanFindManyArgs>(args?: Prisma.SelectSubset<T, PlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PlanCreateArgs>(args: Prisma.SelectSubset<T, PlanCreateArgs<ExtArgs>>): Prisma.Prisma__PlanClient<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PlanCreateManyArgs>(args?: Prisma.SelectSubset<T, PlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PlanCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PlanDeleteArgs>(args: Prisma.SelectSubset<T, PlanDeleteArgs<ExtArgs>>): Prisma.Prisma__PlanClient<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PlanUpdateArgs>(args: Prisma.SelectSubset<T, PlanUpdateArgs<ExtArgs>>): Prisma.Prisma__PlanClient<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PlanDeleteManyArgs>(args?: Prisma.SelectSubset<T, PlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PlanUpdateManyArgs>(args: Prisma.SelectSubset<T, PlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PlanUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PlanUpsertArgs>(args: Prisma.SelectSubset<T, PlanUpsertArgs<ExtArgs>>): Prisma.Prisma__PlanClient<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PlanCountArgs>(args?: Prisma.Subset<T, PlanCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PlanCountAggregateOutputType> : number>;
    aggregate<T extends PlanAggregateArgs>(args: Prisma.Subset<T, PlanAggregateArgs>): Prisma.PrismaPromise<GetPlanAggregateType<T>>;
    groupBy<T extends PlanGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PlanGroupByArgs['orderBy'];
    } : {
        orderBy?: PlanGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PlanFieldRefs;
}
export interface Prisma__PlanClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    Benefitss<T extends Prisma.Plan$BenefitssArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Plan$BenefitssArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlanBenefitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    booking<T extends Prisma.Plan$bookingArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Plan$bookingArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PlanFieldRefs {
    readonly id: Prisma.FieldRef<"Plan", 'String'>;
    readonly name: Prisma.FieldRef<"Plan", 'String'>;
    readonly price: Prisma.FieldRef<"Plan", 'String'>;
    readonly isMostPopular: Prisma.FieldRef<"Plan", 'Boolean'>;
    readonly BillingCycle: Prisma.FieldRef<"Plan", 'BillingCycle'>;
    readonly createdAt: Prisma.FieldRef<"Plan", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Plan", 'DateTime'>;
}
export type PlanFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelect<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    include?: Prisma.PlanInclude<ExtArgs> | null;
    where: Prisma.PlanWhereUniqueInput;
};
export type PlanFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelect<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    include?: Prisma.PlanInclude<ExtArgs> | null;
    where: Prisma.PlanWhereUniqueInput;
};
export type PlanFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelect<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    include?: Prisma.PlanInclude<ExtArgs> | null;
    where?: Prisma.PlanWhereInput;
    orderBy?: Prisma.PlanOrderByWithRelationInput | Prisma.PlanOrderByWithRelationInput[];
    cursor?: Prisma.PlanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlanScalarFieldEnum | Prisma.PlanScalarFieldEnum[];
};
export type PlanFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelect<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    include?: Prisma.PlanInclude<ExtArgs> | null;
    where?: Prisma.PlanWhereInput;
    orderBy?: Prisma.PlanOrderByWithRelationInput | Prisma.PlanOrderByWithRelationInput[];
    cursor?: Prisma.PlanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlanScalarFieldEnum | Prisma.PlanScalarFieldEnum[];
};
export type PlanFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelect<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    include?: Prisma.PlanInclude<ExtArgs> | null;
    where?: Prisma.PlanWhereInput;
    orderBy?: Prisma.PlanOrderByWithRelationInput | Prisma.PlanOrderByWithRelationInput[];
    cursor?: Prisma.PlanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlanScalarFieldEnum | Prisma.PlanScalarFieldEnum[];
};
export type PlanCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelect<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    include?: Prisma.PlanInclude<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.PlanCreateInput, Prisma.PlanUncheckedCreateInput>;
};
export type PlanCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PlanCreateManyInput | Prisma.PlanCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PlanCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    data: Prisma.PlanCreateManyInput | Prisma.PlanCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PlanUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelect<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    include?: Prisma.PlanInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlanUpdateInput, Prisma.PlanUncheckedUpdateInput>;
    where: Prisma.PlanWhereUniqueInput;
};
export type PlanUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PlanUpdateManyMutationInput, Prisma.PlanUncheckedUpdateManyInput>;
    where?: Prisma.PlanWhereInput;
    limit?: number;
};
export type PlanUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PlanUpdateManyMutationInput, Prisma.PlanUncheckedUpdateManyInput>;
    where?: Prisma.PlanWhereInput;
    limit?: number;
};
export type PlanUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelect<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    include?: Prisma.PlanInclude<ExtArgs> | null;
    where: Prisma.PlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlanCreateInput, Prisma.PlanUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PlanUpdateInput, Prisma.PlanUncheckedUpdateInput>;
};
export type PlanDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelect<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    include?: Prisma.PlanInclude<ExtArgs> | null;
    where: Prisma.PlanWhereUniqueInput;
};
export type PlanDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlanWhereInput;
    limit?: number;
};
export type Plan$BenefitssArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Plan$bookingArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type PlanDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelect<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    include?: Prisma.PlanInclude<ExtArgs> | null;
};
