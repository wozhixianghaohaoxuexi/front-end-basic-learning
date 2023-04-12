// 两数相加
type Add<Num1 extends number, Num2 extends number> = [...BuildArray<Num1>, ...BuildArray<Num2>]['length'];
type AddTest = Add<10, 20>;

// 两数相减
type Subtract<Num1 extends number, Num2 extends number> = BuildArray<Num1> extends [...BuildArray<Num2>, ...infer Rest] ? Rest['length'] : never;
type SubtractTest = Subtract<18, 5>;

// 两数相乘
type Mutiply<Num1 extends number, Num2 extends number, Result extends unknown[] = []> = Num2 extends 0 ? Result['length'] : Mutiply<Num1, Subtract<Num2, 1>, [...Result, ...BuildArray<Num1>]>;
type MutiplyTest = Mutiply<3, 222>;

// 两数相除
type Divide<Num1 extends number, Num2 extends number, Result extends unknown[] = []> = Num1 extends 0 ? Result['length'] : Divide<Subtract<Num1, Num2>, Num2, [...Result, unknown]>;
type DivideTest = Divide<30, 10>;

// 统计字符串长度
type StrLength<Str extends string, Result extends unknown[] = []> = Str extends `${string}${infer Rest}` ? StrLength<Rest, [...Result, unknown]> : Result['length'];
type StrLengthTest = StrLength<'abcdefg'>;

// 比较两数大小
type GreaterThan<Num1 extends number, Num2 extends number, TempArr extends unknown[] = []> =
    Num1 extends Num2
        ? false
        : TempArr['length'] extends Num2
            ? true
            : TempArr['length'] extends Num1
                ? false
                : GreaterThan<Num1, Num2, [...TempArr, unknown]>;
type GreaterThanTest = GreaterThan<7, 6>;

// 斐波那契数列
type Fibonacci<
    Num extends number,
    PreArr extends unknown[] = [unknown],
    CurrArr extends unknown[] = [],
    Index extends unknown[] = []
> = Index['length'] extends Num
        ? CurrArr['length']
        : Fibonacci<Num, CurrArr, [...PreArr, ...CurrArr], [...Index, unknown]>;
type FibonacciTest = Fibonacci<9>;