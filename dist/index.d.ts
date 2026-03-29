export declare class ArPatternFile {
    private static sharedCanvas;
    private static sharedContext;
    constructor();
    static toCanvas(patternFileString: string, onComplete: Function): void;
    static encodeImageURL(imageURL: string, onComplete: Function): void;
    static encodeImage(image: any): string;
    static triggerDownload(patternFileString: string, fileName?: string): void;
    static buildFullMarker(innerImageURL: string, pattRatio: number, size: number, color: string, onComplete: Function): void;
}

export { }
