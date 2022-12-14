
export default class VsxprojFile {
    Name: string;
    Projects: {confGUID: string, proj: VsxprojFile}[];
    GUID: string;

    constructor() {
      this.GUID = this.GenerateGUID();
    }

    GenerateGUID(): string {
        return "";
    }

    SetName(name: string) {
        this.Name = name;
    }

    AddProject(proj: VsxprojFile) {
        this.Projects.push({confGUID: this.GenerateGUID(), proj: proj});
    }

    GetProjectPath(proj: VsxprojFile): string {
      return ""
    }

    Compile(): string {

        let content = `
        Microsoft Visual Studio Solution File, Format Version 12.00
        # Visual Studio Version 17
        VisualStudioVersion = 17.4.33110.190
        MinimumVisualStudioVersion = 10.0.40219.1
        ${this.Projects.map(proj => (
          `Project("{${proj.proj.GUID}}") = "${proj.proj.Name}", "${this.GetProjectPath(proj.proj)}", "{${proj.confGUID}}"`
        ))}
        EndProject
        Global
        	GlobalSection(SolutionConfigurationPlatforms) = preSolution
        		Debug|x64 = Debug|x64
        		Release|x64 = Release|x64
        	EndGlobalSection
        	GlobalSection(ProjectConfigurationPlatforms) = postSolution
          ${this.Projects.map(proj => (
            `
            {${proj.confGUID}}.Debug|x64.ActiveCfg = Debug|x64
        		{${proj.confGUID}}.Debug|x64.Build.0 = Debug|x64
        		{${proj.confGUID}}.Release|x64.ActiveCfg = Release|x64
        		{${proj.confGUID}}.Release|x64.Build.0 = Release|x64`
          ))}
        	EndGlobalSection
        	GlobalSection(SolutionProperties) = preSolution
        		HideSolutionNode = FALSE
        	EndGlobalSection
        	GlobalSection(ExtensibilityGlobals) = postSolution
        		SolutionGuid = {${this.GUID}}
        	EndGlobalSection
        EndGlobal
        `;

        return content;
    }

}