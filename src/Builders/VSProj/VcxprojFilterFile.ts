import ProjectFile from "../../Classes/File.js";
import VcxprojFile from "./VcxprojFile.js";

export default class VcxprojFilterFile extends ProjectFile {
    Project: VcxprojFile;
    constructor(proj: VcxprojFile) {
        super();
        this.Project = proj;
    }

    Compile(): string {
        return "";
    }
}