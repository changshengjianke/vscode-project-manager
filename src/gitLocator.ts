import fs = require("fs");
import path = require("path");
import { CustomProjectLocator, CustomRepositoryDetector } from "./abstractLocator";

export class GitRepositoryDetector extends CustomRepositoryDetector {

    public isRepoDir(projectPath: string) {
        let isGit: boolean;
        isGit = fs.existsSync(path.join(projectPath, ".git", "config"));
        if (isGit) {
            return true;
        }

        isGit = fs.existsSync(path.join(projectPath, ".git"));
        if (isGit) {
            let file: string;
            try {
                file = fs.readFileSync(path.join(projectPath, ".git"), "utf8");
                isGit = file.indexOf("gitdir: ") === 0;
                if (isGit) {
                    return true;
                }
            } catch (e) {
                console.log("Error checking git-worktree: " + e);
            }
        }
        
        return false;
    }

}