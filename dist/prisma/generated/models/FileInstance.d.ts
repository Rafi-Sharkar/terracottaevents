import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type FileInstanceModel = runtime.Types.Result.DefaultSelection<Prisma.$FileInstancePayload>;
export type AggregateFileInstance = {
    _count: FileInstanceCountAggregateOutputType | null;
    _avg: FileInstanceAvgAggregateOutputType | null;
    _sum: FileInstanceSumAggregateOutputType | null;
    _min: FileInstanceMinAggregateOutputType | null;
    _max: FileInstanceMaxAggregateOutputType | null;
};
export type FileInstanceAvgAggregateOutputType = {
    size: number | null;
};
export type FileInstanceSumAggregateOutputType = {
    size: number | null;
};
export type FileInstanceMinAggregateOutputType = {
    id: string | null;
    filename: string | null;
    originalFilename: string | null;
    path: string | null;
    url: string | null;
    fileType: $Enums.FileType | null;
    mimeType: string | null;
    size: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FileInstanceMaxAggregateOutputType = {
    id: string | null;
    filename: string | null;
    originalFilename: string | null;
    path: string | null;
    url: string | null;
    fileType: $Enums.FileType | null;
    mimeType: string | null;
    size: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FileInstanceCountAggregateOutputType = {
    id: number;
    filename: number;
    originalFilename: number;
    path: number;
    url: number;
    fileType: number;
    mimeType: number;
    size: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FileInstanceAvgAggregateInputType = {
    size?: true;
};
export type FileInstanceSumAggregateInputType = {
    size?: true;
};
export type FileInstanceMinAggregateInputType = {
    id?: true;
    filename?: true;
    originalFilename?: true;
    path?: true;
    url?: true;
    fileType?: true;
    mimeType?: true;
    size?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FileInstanceMaxAggregateInputType = {
    id?: true;
    filename?: true;
    originalFilename?: true;
    path?: true;
    url?: true;
    fileType?: true;
    mimeType?: true;
    size?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FileInstanceCountAggregateInputType = {
    id?: true;
    filename?: true;
    originalFilename?: true;
    path?: true;
    url?: true;
    fileType?: true;
    mimeType?: true;
    size?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FileInstanceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileInstanceWhereInput;
    orderBy?: Prisma.FileInstanceOrderByWithRelationInput | Prisma.FileInstanceOrderByWithRelationInput[];
    cursor?: Prisma.FileInstanceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FileInstanceCountAggregateInputType;
    _avg?: FileInstanceAvgAggregateInputType;
    _sum?: FileInstanceSumAggregateInputType;
    _min?: FileInstanceMinAggregateInputType;
    _max?: FileInstanceMaxAggregateInputType;
};
export type GetFileInstanceAggregateType<T extends FileInstanceAggregateArgs> = {
    [P in keyof T & keyof AggregateFileInstance]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFileInstance[P]> : Prisma.GetScalarType<T[P], AggregateFileInstance[P]>;
};
export type FileInstanceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileInstanceWhereInput;
    orderBy?: Prisma.FileInstanceOrderByWithAggregationInput | Prisma.FileInstanceOrderByWithAggregationInput[];
    by: Prisma.FileInstanceScalarFieldEnum[] | Prisma.FileInstanceScalarFieldEnum;
    having?: Prisma.FileInstanceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FileInstanceCountAggregateInputType | true;
    _avg?: FileInstanceAvgAggregateInputType;
    _sum?: FileInstanceSumAggregateInputType;
    _min?: FileInstanceMinAggregateInputType;
    _max?: FileInstanceMaxAggregateInputType;
};
export type FileInstanceGroupByOutputType = {
    id: string;
    filename: string;
    originalFilename: string;
    path: string;
    url: string;
    fileType: $Enums.FileType;
    mimeType: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
    _count: FileInstanceCountAggregateOutputType | null;
    _avg: FileInstanceAvgAggregateOutputType | null;
    _sum: FileInstanceSumAggregateOutputType | null;
    _min: FileInstanceMinAggregateOutputType | null;
    _max: FileInstanceMaxAggregateOutputType | null;
};
export type GetFileInstanceGroupByPayload<T extends FileInstanceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FileInstanceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FileInstanceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FileInstanceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FileInstanceGroupByOutputType[P]>;
}>>;
export type FileInstanceWhereInput = {
    AND?: Prisma.FileInstanceWhereInput | Prisma.FileInstanceWhereInput[];
    OR?: Prisma.FileInstanceWhereInput[];
    NOT?: Prisma.FileInstanceWhereInput | Prisma.FileInstanceWhereInput[];
    id?: Prisma.StringFilter<"FileInstance"> | string;
    filename?: Prisma.StringFilter<"FileInstance"> | string;
    originalFilename?: Prisma.StringFilter<"FileInstance"> | string;
    path?: Prisma.StringFilter<"FileInstance"> | string;
    url?: Prisma.StringFilter<"FileInstance"> | string;
    fileType?: Prisma.EnumFileTypeFilter<"FileInstance"> | $Enums.FileType;
    mimeType?: Prisma.StringFilter<"FileInstance"> | string;
    size?: Prisma.IntFilter<"FileInstance"> | number;
    createdAt?: Prisma.DateTimeFilter<"FileInstance"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FileInstance"> | Date | string;
};
export type FileInstanceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    filename?: Prisma.SortOrder;
    originalFilename?: Prisma.SortOrder;
    path?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    fileType?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FileInstanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FileInstanceWhereInput | Prisma.FileInstanceWhereInput[];
    OR?: Prisma.FileInstanceWhereInput[];
    NOT?: Prisma.FileInstanceWhereInput | Prisma.FileInstanceWhereInput[];
    filename?: Prisma.StringFilter<"FileInstance"> | string;
    originalFilename?: Prisma.StringFilter<"FileInstance"> | string;
    path?: Prisma.StringFilter<"FileInstance"> | string;
    url?: Prisma.StringFilter<"FileInstance"> | string;
    fileType?: Prisma.EnumFileTypeFilter<"FileInstance"> | $Enums.FileType;
    mimeType?: Prisma.StringFilter<"FileInstance"> | string;
    size?: Prisma.IntFilter<"FileInstance"> | number;
    createdAt?: Prisma.DateTimeFilter<"FileInstance"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FileInstance"> | Date | string;
}, "id">;
export type FileInstanceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    filename?: Prisma.SortOrder;
    originalFilename?: Prisma.SortOrder;
    path?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    fileType?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FileInstanceCountOrderByAggregateInput;
    _avg?: Prisma.FileInstanceAvgOrderByAggregateInput;
    _max?: Prisma.FileInstanceMaxOrderByAggregateInput;
    _min?: Prisma.FileInstanceMinOrderByAggregateInput;
    _sum?: Prisma.FileInstanceSumOrderByAggregateInput;
};
export type FileInstanceScalarWhereWithAggregatesInput = {
    AND?: Prisma.FileInstanceScalarWhereWithAggregatesInput | Prisma.FileInstanceScalarWhereWithAggregatesInput[];
    OR?: Prisma.FileInstanceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FileInstanceScalarWhereWithAggregatesInput | Prisma.FileInstanceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FileInstance"> | string;
    filename?: Prisma.StringWithAggregatesFilter<"FileInstance"> | string;
    originalFilename?: Prisma.StringWithAggregatesFilter<"FileInstance"> | string;
    path?: Prisma.StringWithAggregatesFilter<"FileInstance"> | string;
    url?: Prisma.StringWithAggregatesFilter<"FileInstance"> | string;
    fileType?: Prisma.EnumFileTypeWithAggregatesFilter<"FileInstance"> | $Enums.FileType;
    mimeType?: Prisma.StringWithAggregatesFilter<"FileInstance"> | string;
    size?: Prisma.IntWithAggregatesFilter<"FileInstance"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FileInstance"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FileInstance"> | Date | string;
};
export type FileInstanceCreateInput = {
    id?: string;
    filename: string;
    originalFilename: string;
    path: string;
    url: string;
    fileType?: $Enums.FileType;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FileInstanceUncheckedCreateInput = {
    id?: string;
    filename: string;
    originalFilename: string;
    path: string;
    url: string;
    fileType?: $Enums.FileType;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FileInstanceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    filename?: Prisma.StringFieldUpdateOperationsInput | string;
    originalFilename?: Prisma.StringFieldUpdateOperationsInput | string;
    path?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    fileType?: Prisma.EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInstanceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    filename?: Prisma.StringFieldUpdateOperationsInput | string;
    originalFilename?: Prisma.StringFieldUpdateOperationsInput | string;
    path?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    fileType?: Prisma.EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInstanceCreateManyInput = {
    id?: string;
    filename: string;
    originalFilename: string;
    path: string;
    url: string;
    fileType?: $Enums.FileType;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FileInstanceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    filename?: Prisma.StringFieldUpdateOperationsInput | string;
    originalFilename?: Prisma.StringFieldUpdateOperationsInput | string;
    path?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    fileType?: Prisma.EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInstanceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    filename?: Prisma.StringFieldUpdateOperationsInput | string;
    originalFilename?: Prisma.StringFieldUpdateOperationsInput | string;
    path?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    fileType?: Prisma.EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInstanceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    filename?: Prisma.SortOrder;
    originalFilename?: Prisma.SortOrder;
    path?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    fileType?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FileInstanceAvgOrderByAggregateInput = {
    size?: Prisma.SortOrder;
};
export type FileInstanceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    filename?: Prisma.SortOrder;
    originalFilename?: Prisma.SortOrder;
    path?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    fileType?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FileInstanceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    filename?: Prisma.SortOrder;
    originalFilename?: Prisma.SortOrder;
    path?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    fileType?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FileInstanceSumOrderByAggregateInput = {
    size?: Prisma.SortOrder;
};
export type EnumFileTypeFieldUpdateOperationsInput = {
    set?: $Enums.FileType;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type FileInstanceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    filename?: boolean;
    originalFilename?: boolean;
    path?: boolean;
    url?: boolean;
    fileType?: boolean;
    mimeType?: boolean;
    size?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["fileInstance"]>;
export type FileInstanceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    filename?: boolean;
    originalFilename?: boolean;
    path?: boolean;
    url?: boolean;
    fileType?: boolean;
    mimeType?: boolean;
    size?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["fileInstance"]>;
export type FileInstanceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    filename?: boolean;
    originalFilename?: boolean;
    path?: boolean;
    url?: boolean;
    fileType?: boolean;
    mimeType?: boolean;
    size?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["fileInstance"]>;
export type FileInstanceSelectScalar = {
    id?: boolean;
    filename?: boolean;
    originalFilename?: boolean;
    path?: boolean;
    url?: boolean;
    fileType?: boolean;
    mimeType?: boolean;
    size?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FileInstanceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "filename" | "originalFilename" | "path" | "url" | "fileType" | "mimeType" | "size" | "createdAt" | "updatedAt", ExtArgs["result"]["fileInstance"]>;
export type $FileInstancePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FileInstance";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        filename: string;
        originalFilename: string;
        path: string;
        url: string;
        fileType: $Enums.FileType;
        mimeType: string;
        size: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["fileInstance"]>;
    composites: {};
};
export type FileInstanceGetPayload<S extends boolean | null | undefined | FileInstanceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FileInstancePayload, S>;
export type FileInstanceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FileInstanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FileInstanceCountAggregateInputType | true;
};
export interface FileInstanceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FileInstance'];
        meta: {
            name: 'FileInstance';
        };
    };
    findUnique<T extends FileInstanceFindUniqueArgs>(args: Prisma.SelectSubset<T, FileInstanceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FileInstanceClient<runtime.Types.Result.GetResult<Prisma.$FileInstancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FileInstanceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FileInstanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileInstanceClient<runtime.Types.Result.GetResult<Prisma.$FileInstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FileInstanceFindFirstArgs>(args?: Prisma.SelectSubset<T, FileInstanceFindFirstArgs<ExtArgs>>): Prisma.Prisma__FileInstanceClient<runtime.Types.Result.GetResult<Prisma.$FileInstancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FileInstanceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FileInstanceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileInstanceClient<runtime.Types.Result.GetResult<Prisma.$FileInstancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FileInstanceFindManyArgs>(args?: Prisma.SelectSubset<T, FileInstanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileInstancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FileInstanceCreateArgs>(args: Prisma.SelectSubset<T, FileInstanceCreateArgs<ExtArgs>>): Prisma.Prisma__FileInstanceClient<runtime.Types.Result.GetResult<Prisma.$FileInstancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FileInstanceCreateManyArgs>(args?: Prisma.SelectSubset<T, FileInstanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FileInstanceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FileInstanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileInstancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FileInstanceDeleteArgs>(args: Prisma.SelectSubset<T, FileInstanceDeleteArgs<ExtArgs>>): Prisma.Prisma__FileInstanceClient<runtime.Types.Result.GetResult<Prisma.$FileInstancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FileInstanceUpdateArgs>(args: Prisma.SelectSubset<T, FileInstanceUpdateArgs<ExtArgs>>): Prisma.Prisma__FileInstanceClient<runtime.Types.Result.GetResult<Prisma.$FileInstancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FileInstanceDeleteManyArgs>(args?: Prisma.SelectSubset<T, FileInstanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FileInstanceUpdateManyArgs>(args: Prisma.SelectSubset<T, FileInstanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FileInstanceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FileInstanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileInstancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FileInstanceUpsertArgs>(args: Prisma.SelectSubset<T, FileInstanceUpsertArgs<ExtArgs>>): Prisma.Prisma__FileInstanceClient<runtime.Types.Result.GetResult<Prisma.$FileInstancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FileInstanceCountArgs>(args?: Prisma.Subset<T, FileInstanceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FileInstanceCountAggregateOutputType> : number>;
    aggregate<T extends FileInstanceAggregateArgs>(args: Prisma.Subset<T, FileInstanceAggregateArgs>): Prisma.PrismaPromise<GetFileInstanceAggregateType<T>>;
    groupBy<T extends FileInstanceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FileInstanceGroupByArgs['orderBy'];
    } : {
        orderBy?: FileInstanceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FileInstanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileInstanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FileInstanceFieldRefs;
}
export interface Prisma__FileInstanceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FileInstanceFieldRefs {
    readonly id: Prisma.FieldRef<"FileInstance", 'String'>;
    readonly filename: Prisma.FieldRef<"FileInstance", 'String'>;
    readonly originalFilename: Prisma.FieldRef<"FileInstance", 'String'>;
    readonly path: Prisma.FieldRef<"FileInstance", 'String'>;
    readonly url: Prisma.FieldRef<"FileInstance", 'String'>;
    readonly fileType: Prisma.FieldRef<"FileInstance", 'FileType'>;
    readonly mimeType: Prisma.FieldRef<"FileInstance", 'String'>;
    readonly size: Prisma.FieldRef<"FileInstance", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"FileInstance", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"FileInstance", 'DateTime'>;
}
export type FileInstanceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInstanceSelect<ExtArgs> | null;
    omit?: Prisma.FileInstanceOmit<ExtArgs> | null;
    where: Prisma.FileInstanceWhereUniqueInput;
};
export type FileInstanceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInstanceSelect<ExtArgs> | null;
    omit?: Prisma.FileInstanceOmit<ExtArgs> | null;
    where: Prisma.FileInstanceWhereUniqueInput;
};
export type FileInstanceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInstanceSelect<ExtArgs> | null;
    omit?: Prisma.FileInstanceOmit<ExtArgs> | null;
    where?: Prisma.FileInstanceWhereInput;
    orderBy?: Prisma.FileInstanceOrderByWithRelationInput | Prisma.FileInstanceOrderByWithRelationInput[];
    cursor?: Prisma.FileInstanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FileInstanceScalarFieldEnum | Prisma.FileInstanceScalarFieldEnum[];
};
export type FileInstanceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInstanceSelect<ExtArgs> | null;
    omit?: Prisma.FileInstanceOmit<ExtArgs> | null;
    where?: Prisma.FileInstanceWhereInput;
    orderBy?: Prisma.FileInstanceOrderByWithRelationInput | Prisma.FileInstanceOrderByWithRelationInput[];
    cursor?: Prisma.FileInstanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FileInstanceScalarFieldEnum | Prisma.FileInstanceScalarFieldEnum[];
};
export type FileInstanceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInstanceSelect<ExtArgs> | null;
    omit?: Prisma.FileInstanceOmit<ExtArgs> | null;
    where?: Prisma.FileInstanceWhereInput;
    orderBy?: Prisma.FileInstanceOrderByWithRelationInput | Prisma.FileInstanceOrderByWithRelationInput[];
    cursor?: Prisma.FileInstanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FileInstanceScalarFieldEnum | Prisma.FileInstanceScalarFieldEnum[];
};
export type FileInstanceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInstanceSelect<ExtArgs> | null;
    omit?: Prisma.FileInstanceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileInstanceCreateInput, Prisma.FileInstanceUncheckedCreateInput>;
};
export type FileInstanceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FileInstanceCreateManyInput | Prisma.FileInstanceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FileInstanceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInstanceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileInstanceOmit<ExtArgs> | null;
    data: Prisma.FileInstanceCreateManyInput | Prisma.FileInstanceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FileInstanceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInstanceSelect<ExtArgs> | null;
    omit?: Prisma.FileInstanceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileInstanceUpdateInput, Prisma.FileInstanceUncheckedUpdateInput>;
    where: Prisma.FileInstanceWhereUniqueInput;
};
export type FileInstanceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FileInstanceUpdateManyMutationInput, Prisma.FileInstanceUncheckedUpdateManyInput>;
    where?: Prisma.FileInstanceWhereInput;
    limit?: number;
};
export type FileInstanceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInstanceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileInstanceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileInstanceUpdateManyMutationInput, Prisma.FileInstanceUncheckedUpdateManyInput>;
    where?: Prisma.FileInstanceWhereInput;
    limit?: number;
};
export type FileInstanceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInstanceSelect<ExtArgs> | null;
    omit?: Prisma.FileInstanceOmit<ExtArgs> | null;
    where: Prisma.FileInstanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileInstanceCreateInput, Prisma.FileInstanceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FileInstanceUpdateInput, Prisma.FileInstanceUncheckedUpdateInput>;
};
export type FileInstanceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInstanceSelect<ExtArgs> | null;
    omit?: Prisma.FileInstanceOmit<ExtArgs> | null;
    where: Prisma.FileInstanceWhereUniqueInput;
};
export type FileInstanceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileInstanceWhereInput;
    limit?: number;
};
export type FileInstanceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInstanceSelect<ExtArgs> | null;
    omit?: Prisma.FileInstanceOmit<ExtArgs> | null;
};
