import Deploy from "../Classes/Deploy";
import Module from "../Classes/Module";

type RootModule = "Engine" | "Project";
type ModuleType = "Module" | "Deploy";

interface RawModule {
    path: string,
    object: Module | Deploy,
    type: ModuleType,
    hash: string
    domain: RootModule,
    files: string[] 
}

interface ModuleList {
    Modules: RawModule[],
    Deploys: RawModule[],
}

interface MultiModuleList {
    Project: ModuleList, 
    Engine: ModuleList
}