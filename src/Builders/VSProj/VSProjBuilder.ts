import { dirname, resolve } from "path";
import Deploy from "../../Classes/Deploy";
import { ModuleList, MultiModuleList, RawModule } from "../../Types/ModuleList";
import Utils from "../../utils";
import Builder from "../builder"
import SlnFile from "./SlnFile";
import VcxprojFile from "./VcxprojFile";
import VcxprojFilterFile from "./VcxprojFilterFile";



export default class VSProjBuilder extends Builder {

    constructor(target: Target) {
        super(target);
        
        
    }

    protected QueueProject(Name: string, Solution: SlnFile, moduleList: ModuleList) {
        let EngineProject: VcxprojFile = new VcxprojFile();
                EngineProject.SetGUID(Utils.GenerateGUID());
                EngineProject.SetPath(resolve(this.Target.enginePath, `./Intermediate/${Name}.vcxproj`));
                EngineProject.SetName(Name);
                EngineProject.AddDefinition(Utils.GetPlatformDef(this.Target));

                for(let module of moduleList.Modules) {
                    EngineProject.AddInclude(dirname(module.path));

                    for(let path of module.files) {
                        EngineProject.AddFile(path);
                    }
                }

                for(let module of moduleList.Deploys) {
                    for(let incl of (<Deploy>(module.object)).Includes) {
                        EngineProject.AddInclude(incl);
                    }
                }
                
                let EngineProjectFilter: VcxprojFilterFile = new VcxprojFilterFile(EngineProject);
    
                Solution.AddProject(EngineProject);
    
                this.QueuedFiles.push(EngineProject);
                this.QueuedFiles.push(EngineProjectFilter);
                this.QueuedFiles.push(Solution);
    }

    async Build(list: MultiModuleList) {
        return new Promise<void>((res, rej) => {
            try {
                let Solution: SlnFile = new SlnFile();
                Solution.GenerateGUID();
                
                if(this.Target.includeEngine) {
                    this.QueueProject(this.Target.engine.Name, Solution, list.Engine);
                }

                this.QueueProject(this.Target.project.Name, Solution, list.Project);
            
                // Save
                for(let file of this.QueuedFiles) {
                    this.SaveFile(file.Path, file.Compile());
                }

                res();
            } catch (exc) {
                rej(exc);
            }
        });
    }
}