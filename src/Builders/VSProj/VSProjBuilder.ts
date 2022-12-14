import { MultiModuleList } from "../../Types/ModuleList";
import Builder from "../builder"



export default class VSProjBuilder extends Builder {
    OutputStart: string;
    OutputEnd: string;
    constructor(target: Target) {
        super(target);
        
        
    }

    async Build(list: MultiModuleList) {
        return new Promise<void>((res, rej) => {
            
        });
    }
}