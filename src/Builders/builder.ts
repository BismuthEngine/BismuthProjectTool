import { MultiModuleList } from "../Types/ModuleList";

export default class Builder {
    constructor(target: Target) {
        this.Target = target;
    }

    Target: Target;

    async Build(list: MultiModuleList) {
        
    }
}