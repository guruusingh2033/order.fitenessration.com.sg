export declare class DateSet {
    rules: any;
    static rule: {
        all(): boolean;
        weekday(weekday: any): Function;
        range(beginDate: Date | string, endDate: Date | string): Function;
        invertedRange(beginDate: Date | string, endDate: Date | string): Function;
        date(date: any): Function;
        dayOfYear(dayOfYear: string): Function;
        after(date: any): Function;
        before(date: any): Function;
        dateSet(dateSet: DateSet): Function;
    };
    clearCache(): void;
    addRule(type: string, rule: Function, priority?: number): void;
    static testRule(type: string, rule: Function, date: Date): boolean | number;
    resolveRules(): any[];
    test(date: Date | string): boolean | number;
    earliestDate(maxDaysInFuture?: number): Date;
}
