export interface ITemplateOptions {
    showPrev: boolean;
    showSteps: boolean;
    footerStyles: boolean;
}
export declare class Template {
    el: HTMLElement;
    constructor(html: string);
    getHtml(tag: any): string;
    private fix(html);
    options: ITemplateOptions;
    body: string;
    footer: string;
    title: string;
}
