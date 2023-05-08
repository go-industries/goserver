"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const goserver_config_json_1 = __importDefault(require("./goserver.config.json"));
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
// THE node.exe FILE PATH
const nodePath = path_1.default.resolve(__dirname, "node", "node");
// THE SCRIPTS VALUE
const scripts = goserver_config_json_1.default.scripts;
const baseDirectory = __dirname;
// FUNCTION MEANT FOR RUNNING A PROCESS
const runScripts = (command) => {
    console.log(`Running \`${command}\` command`);
    (0, child_process_1.execSync)(`cd ${path_1.default.resolve(baseDirectory, goserver_config_json_1.default.rootDirectory)} && ${command}`, {
        stdio: "inherit",
    });
};
// UPDATE THE NUMBER OF BUILDS IN THE goserver.out.json FILE
const updateNumberOfBuildsInGoServerOut = (numberOfBuilds, goServerOut) => __awaiter(void 0, void 0, void 0, function* () {
    const newGoServerOut = Object.assign(Object.assign({}, goServerOut), { numberOfBuilds: numberOfBuilds });
    yield (0, promises_1.writeFile)(path_1.default.resolve(baseDirectory, "./goserver.out.json"), JSON.stringify(newGoServerOut));
});
// IF THE scripts VARIABLE IS NOT AN ARRAY NOR AN OBJECT, THROW AN ERROR
if (!(typeof scripts === "object"))
    throw new Error(`Expected \`scripts\` in \`goserver.config.js\` to be either an object or an array but got \`${typeof scripts}\``);
// METHOD TO RUN SCRIPTS FOR A STATIC SERVICE
const runStaticScripts = () => __awaiter(void 0, void 0, void 0, function* () {
    // METHOD RESPONSIBLE FOR PROCESSING THE scripts VARIABLE IF IT'S AN ARRAY
    const runScriptsArray = (scripts) => __awaiter(void 0, void 0, void 0, function* () {
        // LOOP THROUGH ALL STRINGS/COMMANGS IN THE scripts ARRAY
        for (const script of scripts) {
            // RUN THE script/command
            runScripts(script);
        }
        // START THE EXPRESS SERVER
        runScripts("${nodePath} goserver-express-server.js");
    });
    // METHOD RESPONSIBLE FOR PROCESSING THE scripts VARIABLE IF IT'S AN OBJECT
    const runScriptsObject = (scripts) => __awaiter(void 0, void 0, void 0, function* () {
        // IMPORT THE goserver.out.json FILE
        const goServerOut = require("./goserver.out.json");
        // GET THE NUMBER OF BUILDS DONE FROM THE goserver.out.json FILE
        let noOfbuilds = +(goServerOut === null || goServerOut === void 0 ? void 0 : goServerOut.numberOfBuilds);
        // IF THE NUMBER OF BUILDS IS LESS THAN ONE (I.E IF THIS IS THE FIRST BUILD)
        if (noOfbuilds < 1) {
            // INCREMENT THE NUMBER OF BUILDS BY ONE
            noOfbuilds++;
            // UPDATE THE goserver.out.json FILE WITH THE CURRENT NUMBER OF BUILDS
            yield updateNumberOfBuildsInGoServerOut(noOfbuilds, goServerOut);
            // LOOP THROUGH ALL STRINGS/COMMANGS IN THE scripts OBJECT
            for (const script in scripts) {
                // RUN THE script/command
                runScripts(scripts[script]);
            }
        }
        // START THE EXPRESS SERVER
        runScripts("${nodePath} goserver-express-server.js");
    });
    // IF THE scripts VARIABLE IS AN ARRAY
    if (Array.isArray(scripts))
        yield runScriptsArray(scripts);
    // IF THE scripts VARIABLE IS AN OBJECT
    else if (typeof scripts === "object")
        yield runScriptsObject(scripts);
});
// METHOD TO RUN SCRIPTS FOR A SERVER SERVICE
const runServerScripts = () => __awaiter(void 0, void 0, void 0, function* () {
    // METHOD RESPONSIBLE FOR PROCESSING THE scripts VARIABLE IF IT'S AN ARRAY
    const runScriptsArray = (scripts) => __awaiter(void 0, void 0, void 0, function* () {
        // LOOP THROUGH ALL STRINGS/COMMANGS IN THE scripts ARRAY
        for (const script of scripts) {
            // RUN THE script/command
            runScripts(script);
        }
    });
    // METHOD RESPONSIBLE FOR PROCESSING THE scripts VARIABLE IF IT'S AN OBJECT
    const runScriptsObject = (scripts) => __awaiter(void 0, void 0, void 0, function* () {
        // IMPORT THE goserver.out.json FILE
        const goServerOut = require("./goserver.out.json");
        // GET THE NUMBER OF BUILDS DONE FROM THE goserver.out.json FILE
        let noOfbuilds = +(goServerOut === null || goServerOut === void 0 ? void 0 : goServerOut.numberOfBuilds);
        // IF THE NUMBER OF BUILDS IS LESS THAN ONE (I.E IF THIS IS THE FIRST BUILD)
        if (noOfbuilds < 1) {
            // INCREMENT THE NUMBER OF BUILDS BY ONE
            noOfbuilds++;
            // UPDATE THE goserver.out.json FILE WITH THE CURRENT NUMBER OF BUILDS
            yield updateNumberOfBuildsInGoServerOut(noOfbuilds, goServerOut);
            // LOOP THROUGH ALL STRINGS/COMMANGS IN THE scripts OBJECT
            for (const script in scripts) {
                // RUN THE script/command
                runScripts(scripts[script]);
            }
        }
        // RUN THE COMMAND WITH THE START KEYWORD OR  RUN THE FILE SPECIFIED IN THE entry PROPERTY
        runScripts(scripts["start"] || `${nodePath} ${goserver_config_json_1.default.entry}`);
    });
    // IF THE scripts VARIABLE IS AN ARRAY
    if (Array.isArray(scripts))
        yield runScriptsArray(scripts);
    // IF THE scripts VARIABLE IS AN OBJECT
    else if (typeof scripts === "object")
        yield runScriptsObject(scripts);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    // IF THE goServerConfig.type IS STATIC (STATIC SERVICE)
    if (goserver_config_json_1.default.type === "static")
        yield runStaticScripts();
    // IF THE goServerConfig.type IS SERVER (SERVER SERVICE)
    if (goserver_config_json_1.default.type === "server")
        yield runServerScripts();
}))();
