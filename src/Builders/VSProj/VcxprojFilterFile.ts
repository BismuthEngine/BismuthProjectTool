import ProjectFile from "../../Classes/File";
import VcxprojFile from "./VcxprojFile";

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