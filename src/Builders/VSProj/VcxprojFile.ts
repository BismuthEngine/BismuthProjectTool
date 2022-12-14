import { RootModule } from "../../Types/ModuleList";

export default class VcxprojFile {
    Name: string;
    Includes: string[];
    Defines: string[];
    GUID: string;
    Domain: RootModule

    GenerateGUID() {
        
    }

    SetName(name: string) {
        this.Name = name;
    }

    AddInclude(incl: string) {
        this.Includes.push(incl);
    }

    AddDefinition(def: string) {
        this.Defines.push(def);
    }

    Compile(): string {
        let PreprocessorDifinitions = "_CONSOLE;%(PreprocessorDefinitions);";

        this.Defines.forEach(def => {
            PreprocessorDifinitions += `${def};`;
        });

        let Includes = "";
        this.Includes.forEach(incl => {
            Includes += `${incl};`;
        })

        let content = `
        <?xml version="1.0" encoding="utf-8"?>
        <Project DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">

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
                <VCProjectVersion>16.0</VCProjectVersion>
                <Keyword>Win32Proj</Keyword>
                <!-- Project ID from .SLN -->
                <ProjectGuid>{${this.GUID}}</ProjectGuid>
                <RootNamespace>${this.Name}</RootNamespace>
                <WindowsTargetPlatformVersion>10.0</WindowsTargetPlatformVersion>
            </PropertyGroup>
        
            <Import Project="$(VCTargetsPath)\\Microsoft.Cpp.Default.props" />
            <Import Project="$(VCTargetsPath)\\Microsoft.Cpp.props" />
            <ImportGroup Label="ExtensionSettings"></ImportGroup>
            <ImportGroup Label="Shared"></ImportGroup>
        
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
        
            <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
                <ClCompile>
                  <WarningLevel>Level3</WarningLevel>
                  <SDLCheck>true</SDLCheck>
                  <PreprocessorDefinitions>${PreprocessorDifinitions}_DEBUG;</PreprocessorDefinitions>
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
                  <PreprocessorDefinitions>${PreprocessorDifinitions}NDEBUG;</PreprocessorDefinitions>
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
            <ImportGroup Label="PropertySheets" Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
              <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
            </ImportGroup>
            <ImportGroup Label="PropertySheets" Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
              <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
            </ImportGroup>
            <PropertyGroup Label="UserMacros" />
            <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
              <IncludePath>${Includes}$(IncludePath)</IncludePath>
            </PropertyGroup>
            <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
              <IncludePath>${Includes}$(IncludePath)</IncludePath>
            </PropertyGroup>
        </Project>
        `;

        return content;
    }

}