export default abstract class BaseEngine {
    abstract init(): Promise<void>
    abstract click(selector: string): Promise<void>;
    abstract type(selector: string, text: string): Promise<void>;
    abstract waitForNavigation(): Promise<void>;
    abstract goto(url: string): Promise<void>;
    abstract reload(): Promise<void>;
    abstract getScreenshot(selector: string): Promise<string | Buffer>;
    abstract getInnerHTML(selector: string): Promise<string>;
    abstract checkOnScreen(selector: string): Promise<boolean>;
    abstract $eval<Type>(selector: string, pageFunction: (element: Element, ...args: any[]) => any, ...args: any[]): Promise<Type>;
    abstract $$eval<Type>(selector: string, pageFunction: (elements: Element[], ...args: any[]) => any, ...args: any[]): Promise<Type[]>;
    abstract shutdown(): Promise<void>;
}
