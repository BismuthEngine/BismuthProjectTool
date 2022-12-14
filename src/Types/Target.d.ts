type Platform = "Win32" | "Mach" | "Unix";
type Arch = "x86_32" | "x86_64" | "ARM_32" | "ARM_64";

interface Target {
    platform: Platform,
    arch: Arch,
    // If false, project won't be linked against Bismuth Engine (Should be false only when compiling engine & tools)
    includeEngine: boolean,
    enginePath: string, 
    projectPath: string,
    outputhPath: string
    project: Project,
    engine: Project
    EnvArgs: NodeJS.ProcessEnv,
    entry: string,
    editorMode: boolean,
    debug: boolean,
    verbose: boolean
}