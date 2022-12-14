import { dirname, resolve } from "path";
import Deploy from "../../Classes/Deploy.js";
import { ModuleList, MultiModuleList, RawModule } from "../../Types/ModuleList";
import Utils from "../../utils.js";
import Builder from "../builder.js"
import SlnFile from "./SlnFile.js";
import VcxprojFile from "./VcxprojFile.js";
import VcxprojFilterFile from "./VcxprojFilterFile.js";



export default class VSProjBuilder extends Builder {

    constructor(target: Target) {
        super(target);
        
        
    }

    protected QueueProject(Name: string, Solution: SlnFile, moduleList: ModuleList) {
        let EngineProject: VcxprojFile = new VcxprojFile();
                EngineProject.SetGUID(Utils.GenerateGUID());
                EngineProject.SetPath(resolve(this.Target.projectPath, `./Intermediate/Projects/${Name}.vcxproj`));
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

                    for(let path of module.files) {
                        EngineProject.AddFile(path);
                    }
                }
                
                let EngineProjectFilter: VcxprojFilterFile = new VcxprojFilterFile(EngineProject);
    
                Solution.AddProject(EngineProject);
    
                this.QueuedFiles.push(EngineProject);
                //this.QueuedFiles.push(EngineProjectFilter);
                this.QueuedFiles.push(Solution);
    }

    async Build(list: MultiModuleList) {
        return new Promise<void>((res, rej) => {
            try {
                let Solution: SlnFile = new SlnFile();
                Solution.Path = resolve(this.Target.projectPath, `./${this.Target.project.Name}.sln`);
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