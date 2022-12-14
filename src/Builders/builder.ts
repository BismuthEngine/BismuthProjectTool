import { mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import ProjectFile from "../Classes/File";
import { MultiModuleList } from "../Types/ModuleList";
import Utils from "../utils";
import SlnFile from "./VSProj/SlnFile";
import VcxprojFile from "./VSProj/VcxprojFile";
import VcxprojFilterFile from "./VSProj/VcxprojFilterFile";

export default class Builder {
    constructor(target: Target) {
        this.Target = target;
    }

    QueuedFiles: ProjectFile[]

    Target: Target;

    protected SaveFile(path: string, content: string) {
        mkdirSync(dirname(path), {recursive: true});
        writeFileSync(path, content);
    }

    async Build(list: MultiModuleList) {

    }
}