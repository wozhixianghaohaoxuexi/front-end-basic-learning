// 递归获取promise中的类型
type DeepPromiseValueType<P> = P extends Promise<infer value> ? DeepPromiseValueType<value> : P;
type DeepPromiseValueTypeTest = DeepPromiseValueType<Promise<Promise<Promise<Record<string, any>>>>>;

// 反转数组
type ReverseArray<T extends unknown[]> = T extends [infer first, ...infer rest] ? [...ReverseArray<rest>, first] : T;
type ReverseArrayTest = ReverseArray<[1,2,3,4]>;

// 判断数组是否包含某个元素
type Includes<Arr extends unknown[], findItem> = Arr extends [infer first, ...infer rest] ? IsEqual<first, findItem> extends true ? true : Includes<rest, findItem> : false;
// 判断两个值是否相等
type IsEqual<a, b> = (a extends b ? true : false) & (b extends a ? true : false);
type IsEqualTest = IsEqual<3,4>;;
type IncludesTest = Includes<[1,2,3,4], 5>;

// 移除数组指定元素
type RemoveItem<Arr extends unknown[], Item, Result extends unknown[]> = 
    Arr extends [infer first, ...infer rest]
        ? IsEqual<first, Item> extends true
            ? RemoveItem<rest, Item, Result> 
            : RemoveItem<rest, Item, [...Result, first]>
        : Result;
type RemoveItemTest = RemoveItem<[1,2,1,3,4], 1, []>;

// 指定长度构建元组
type BuildArray<Length, Item = undefined, Result extends unknown[] = []> = Result['length'] extends Length ? Result : BuildArray<Length, Item, [...Result, Item]>;
type BuildArrayTest = BuildArray<5, 1, []>;

// 字符串替换
type ReplaceAll<Str extends string, From extends string, To extends string> = Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${ReplaceAll<Suffix, From, To>}` : Str;
type ReplaceAllTest = ReplaceAll<'ding-dong', 'd', 'D'>;

// 字符串转字符联合类型
type StringToUnion<Str extends string> = Str extends `${infer one}${infer rest}` ? one | StringToUnion<rest> : never ;
type StringToUnionTest = StringToUnion<'string'>;

// 反转字符串
type ReverseString<Str extends string> = Str extends `${infer First}${infer Rest}` ? `${ReverseString<Rest>}${First}` : Str;
type ReverseStringTest = ReverseString<'a'>;

// 对象key添加readonly修饰
type ToReadonly<Obj extends object> = {
    readonly [key in keyof Obj]: Obj[key]
}
type ToReadonlyTest = ToReadonly<{a: 1, b:2}>;

// 深层递归对象key添加readonly修饰
type DeepReadonly<T extends object> = 
    T extends any
        ? {
            readonly [key in keyof T] : T[key] extends object
                ? T[key] extends Function
                    ? T[key]
                    : DeepReadonly<T[key]>
                : T[key] 
        }
        : never;
type DeepReadonlyTest = DeepReadonly<{
    a: {
        b: {
            c: {
                f: () => 'dong',
                d: {
                    e: {
                        guang: string
                    }
                }
            }
        }
    }
}>;