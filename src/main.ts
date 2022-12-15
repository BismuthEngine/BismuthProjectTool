
import ParseArguments from "./arguments.js"
import Utils from "./utils.js";
import chalk from "chalk";
import { exit } from "process";
import Crawler from "./Crawler/Crawler.js";
import { MultiModuleList } from "./Types/ModuleList.js";
import Builder from "./Builders/builder.js";
import { dirname } from "path";

let args: Arguments = ParseArguments(process.argv);

var project: {path?: string, proj?: Project} = {};
var engineProject: {path?: string, proj?: Project} = {};

// Retrieve project file
try {
    project.path = dirname(args.Path);
    project.proj = Utils.ReadJSON(Utils.GetFilesFiltered(project.path, /\.bismuth/)[0]);
    if(project.proj != undefined) {
        if(project.proj!.EnginePath) {
            // Fetch engine's project file
            try {
                engineProject.path = project.proj!.EnginePath;
                engineProject.proj = Utils.ReadJSON(Utils.GetFilesFiltered(project.proj!.EnginePath, /\.bismuth/)[0]);
            } catch (err) {
                console.log(chalk.redBright.bold("[ERROR] ") + chalk.redBright("No engine's .bismuth file found! Check that engine is installed and reference is updated."));
                exit(-1);
            }
        }
    }
} catch (err) {
    console.log(chalk.redBright.bold("[ERROR] ") + chalk.redBright("No correct .bismuth file provided!"));
    exit(-1);
}

// Build fake target instance for crawler
let target: Target = {
    platform: Utils.GetPlatform(process.platform),
    arch: Utils.GetArch(process.arch),
    includeEngine: (engineProject.path != undefined),
    enginePath: ((engineProject.path != undefined) ? engineProject.path : ""),
    projectPath: project.path,
    outputhPath: "",
    EnvArgs: process.env,
    entry: "",
    editorMode: false,
    debug: false,
    verbose: args.Verbose,
    project: project.proj!,
    engine: engineProject.proj!
}

if(target.verbose) {
    console.log("Target object is: ");
    console.log({...target, EnvArgs: undefined});
}

const CrawlerInstance = new Crawler(target);

CrawlerInstance.CollectModules()
.then(async (list: MultiModuleList) => {
    let BuilderInstance: Builder = Utils.CreateBuilderInstance(args.Target, target);

    BuilderInstance.Build(list)
    .then(()=>{

    })
    .catch((reason) => {
        console.error(reason);
    });
})
.catch(reason => {
    console.error(reason);
});