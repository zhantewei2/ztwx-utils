export declare type AssemblyType = "css" | "js";
export interface AssemblyFromFileParameter {
    fileAddress: string;
    type: AssemblyType;
    id: string;
    globalVariableName?: string;
}
export declare class LibraryItem {
    id: string;
    globalVariableName: string | undefined;
    get variable(): any;
    loadSuccess: boolean;
    loadError: boolean;
    isloading: boolean;
    loadEnd: (err?: boolean) => void;
    constructor(id: string, globalVariableName: string | undefined);
    destroy(): void;
    getVariable(): Promise<any>;
    load(fileAddress: string, type: AssemblyType): void;
}
export declare class Library {
    lib: {
        [key: string]: Promise<any>;
    };
    _lib: Record<string, LibraryItem>;
    private assemblyLib;
    /**
     * load js or css file.
     * @param id primarykey unique id. must be specified;
     * @param globalVariableName The global variable name provided by the js file;
     * @param fileAddress absolute path or relative path;
     * @param type  js|css;
     */
    assemblyFromFile({ id, globalVariableName, fileAddress, type }: AssemblyFromFileParameter): void;
}
