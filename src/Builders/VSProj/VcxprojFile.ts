import ProjectFile from "../../Classes/File.js";
import { RootModule } from "../../Types/ModuleList";
import Utils from "../../utils.js";

export default class VcxprojFile extends ProjectFile {
    Name: string;
    Includes: string[] = [];
    Defines: string[] = [];
    Files: string[] = [];
    GUID: string;
    Domain: RootModule

    SetGUID(guid: string) {
        this.GUID = guid;
    }

    SetName(name: string) {
        this.Name = name;
    }

    SetPath(path: string) {
      this.Path = path;
    }

    AddFile(file: string){
      this.Files.push(file);
    }

    AddInclude(incl: string) {
        this.Includes.push(incl);
    }

    AddDefinition(def: string) {
        this.Defines.push(def);
    }

    Compile(): string {
        let PreprocessorDifinitions = "";

        this.Defines.forEach(def => {
            PreprocessorDifinitions += `${def};`;
        });

        let Includes = "";
        this.Includes.forEach(incl => {
            Includes += `${incl};`;
        })

        let content = `<?xml version="1.0" encoding="utf-8"?>
        <Project DefaultTargets="Build" ToolsVersion="17.0" xmlns='http://schemas.microsoft.com/developer/msbuild/2003'>

          <ItemGroup Label="ProjectConfigurations">
            <ProjectConfiguration Include="Debug">
              <Configuration>Debug</Configuration>
              <Platform>Win32</Platform>
            </ProjectConfiguration>
            <ProjectConfiguration Include="Release">
              <Configuration>Release</Configuration>
              <Platform>x64</Platform>
            </ProjectConfiguration>
          </ItemGroup>

          <PropertyGroup Label="Globals">
            <VCProjectVersion>17.0</VCProjectVersion>
            <MinimumVisualStudioVersion>17.0</MinimumVisualStudioVersion>
            <Keyword>MakeFileProj</Keyword>
            <PlatformToolset>v143</PlatformToolset>
            <ProjectGuid>{${this.GUID}}</ProjectGuid>
            <RootNamespace>${this.Name}</RootNamespace>
            <WindowsTargetPlatformVersion>10.0</WindowsTargetPlatformVersion>
            <TargetRuntime>Native</TargetRuntime>
          </PropertyGroup>
          <Import Project="$(VCTargetsPath)\Microsoft.Cpp.default.props" />
          
          <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'" Label="Configuration">
            <ConfigurationType>Application</ConfigurationType>
            <UseDebugLibraries>true</UseDebugLibraries>
            <PlatformToolset>v143</PlatformToolset>
            <CharacterSet>Unicode</CharacterSet>
          </PropertyGroup>
          <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'" Label="Configuration">
            <ConfigurationType>Application</ConfigurationType>
            <UseDebugLibraries>false</UseDebugLibraries>
            <PlatformToolset>v143</PlatformToolset>
            <WholeProgramOptimization>true</WholeProgramOptimization>
            <CharacterSet>Unicode</CharacterSet>
          </PropertyGroup>

          <Import Project="$(VCTargetsPath)\Microsoft.Cpp.props" />
          <ImportGroup Label="ExtensionSettings" />

          <ImportGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'" Label="PropertySheets">
            <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
          </ImportGroup>
          <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
            <IncludePath>${Includes}</IncludePath>
            <ReferencePath />
            <LibraryPath />
            <LibraryWPath />
            <SourcePath />
            <ExcludePath />
          </PropertyGroup>
          <ImportGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'" Label="PropertySheets">
            <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
          </ImportGroup>
          <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
            <IncludePath>${Includes}</IncludePath>
            <ReferencePath />
            <LibraryPath />
            <LibraryWPath />
            <SourcePath />
            <ExcludePath />
          </PropertyGroup>

          <PropertyGroup Label="UserMacros" />
          
          <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
            <ClCompile>
              <WarningLevel>Level3</WarningLevel>
              <SDLCheck>true</SDLCheck>
              <PreprocessorDefinitions>${this.Defines}_DEBUG;_CONSOLE;%(PreprocessorDefinitions)</PreprocessorDefinitions>
              <ConformanceMode>true</ConformanceMode>
              <LanguageStandard>stdcpp20</LanguageStandard>
              <EnableModules>true</EnableModules>
              <ScanSourceForModuleDependencies>true</ScanSourceForModuleDependencies>
            </ClCompile>
            <Link>
              <SubSystem>Console</SubSystem>
              <GenerateDebugInformation>true</GenerateDebugInformation>
            </Link>
          </ItemDefinitionGroup>
          <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
            <ClCompile>
              <WarningLevel>Level3</WarningLevel>
              <FunctionLevelLinking>true</FunctionLevelLinking>
              <IntrinsicFunctions>true</IntrinsicFunctions>
              <SDLCheck>true</SDLCheck>
              <PreprocessorDefinitions>${this.Defines};NDEBUG;_CONSOLE;%(PreprocessorDefinitions)</PreprocessorDefinitions>
              <ConformanceMode>true</ConformanceMode>
              <LanguageStandard>stdcpp20</LanguageStandard>
              <EnableModules>true</EnableModules>
              <ScanSourceForModuleDependencies>true</ScanSourceForModuleDependencies>
            </ClCompile>
            <Link>
              <SubSystem>Console</SubSystem>
              <EnableCOMDATFolding>true</EnableCOMDATFolding>
              <OptimizeReferences>true</OptimizeReferences>
              <GenerateDebugInformation>true</GenerateDebugInformation>
            </Link>
          </ItemDefinitionGroup>

          <ItemGroup>
            ${this.Files.map(path=>(
              `<ClCompile Include="${Utils.GetRelativePath(path, this.Path)}" />\n`
            )).join('')}
          </ItemGroup>

          <Import Project="$(VCTargetsPath)\Microsoft.Cpp.targets" />
          <ImportGroup Label="ExtensionTargets">
          </ImportGroup>
        </Project>
        `;

        return content;
    }

}