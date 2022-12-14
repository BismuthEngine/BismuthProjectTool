import { mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import ProjectFile from "../Classes/File.js";
import { MultiModuleList } from "../Types/ModuleList";
import Utils from "../utils.js";
import SlnFile from "./VSProj/SlnFile.js";
import VcxprojFile from "./VSProj/VcxprojFile.js";
import VcxprojFilterFile from "./VSProj/VcxprojFilterFile.js";

export default class Builder {
    constructor(target: Target) {
        this.Target = target;
    }

    QueuedFiles: ProjectFile[] = []

    Target: Target;

    protected SaveFile(path: string, content: string) {
        if(path != undefined) {
            mkdirSync(dirname(path), {recursive: true});
            writeFileSync(path, content);

            console.log(`Wrote file to ${path}`);
        } else {
            throw "Path is undefined, content is: \n" + content;
        }
    }

    async Build(list: MultiModuleList) {

    }
}