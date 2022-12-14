import { existsSync, lstatSync, readdirSync, readFileSync, rmdirSync, statSync, unlinkSync } from "fs";
import Module from "./Classes/Module";
import { join, resolve } from "path";
import { pathToFileURL } from "url";
import VSProjBuilder from "./Builders/VSProj/VSProjBuilder";

export default class Utils {
    static GetPlatformDef(Target: Target): string {
        switch(Target.platform) {
            case "Win32":
                return "PLATFORM_WINDOWS";
            case "Unix":
                return "PLATFORM_LINUX";
            case "Mach":
                return "PLATFORM_MAC";
        }
    }

    static CreateBuilderInstance(proj: ProjectTarget, target: Target) {
        switch (proj) {
            case "VSProj":
                return new VSProjBuilder(target);
        }
    }

    static GetPlatform(platform: string): Platform {
        switch(platform)
        {
            case "win32":
                return "Win32";
            case "darwin":
                return "Mach";
            case "linux":
                return "Unix";
            case "freebsd":
                return "Unix";
            default:
                throw "Unsupported platform";
        }
    }

    static GetArch(arch: string): Arch {
        switch(arch) {
            case "ia32":
                return "x86_32";
                break;
            case "x64":
                return "x86_64";
                break;
            case "arm":
                return "ARM_32";
                break;
            case "arm64":
                return "ARM_64";
                break;
            default:
                throw "Unsupported CPU architecture";
        }
    }

    static ReadJSON(path: string): any {
        return JSON.parse(readFileSync(path).toString());
    }

    static GetFilesFiltered(path: string, filter: RegExp, recursive: boolean = false): string[] {
        if (!existsSync(path)) {
            throw `Doesn't exist`;
        }

        let retfiles: string[] = [];
    
        var files = readdirSync(path);
        for (var i = 0; i < files.length; i++) {
            var filename = resolve(path, files[i]);
            var stat = lstatSync(filename);
            if (stat.isDirectory()) {
                if(recursive) {
                    this.GetFilesFiltered(filename, filter, recursive);
                }
            } else if (filter.test(filename)) {
                retfiles.push(filename);
            };
        };

        return retfiles;
    }

    static GetIntermediateFolder(root: string): string {
        return pathToFileURL(resolve(root, "./Intermediate/")).toString();
    }

    static GetModuleFolder(path: string): string {
        return path.substring(0, path.lastIndexOf("/"));
    }

    static GetPathFilename(path: string) {
        let s = path.split(/[\/\\]/);
        return s[s.length-1].split(/\./)[0];
    }

    static EmptyDir(path: string) {
        const dirContents = readdirSync(path);
      
        for (const fileOrDirPath of dirContents) {
          try {
            const fullPath = join(path, fileOrDirPath);
            const stat = statSync(fullPath);
            if (stat.isDirectory()) {
              if (readdirSync(fullPath).length) this.EmptyDir(fullPath);
              rmdirSync(fullPath);
            } else unlinkSync(fullPath);
          } catch (ex) {
            console.error(ex.message);
          }
        }

        rmdirSync(path);
    }

    static GetRelativePath(path: string, root: string): string {
        return "";
    }

    static GenerateGUID(): string {
        return crypto.randomUUID();
    }
}