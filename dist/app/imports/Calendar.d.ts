import { ApiService } from './ApiService';
export declare class Calendar {
    private apiService;
    private order;
    _currentMonth: Date;
    _dateSet: {};
    _cbs: any;
    timeSlots: any;
    constructor(apiService: ApiService, order: any);
    private callCbs();
    dateSet(month: Date, cb: Function): void;
}
