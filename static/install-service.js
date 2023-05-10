"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const goserver_config_json_1 = __importDefault(require("./goserver.config.json"));
const path_1 = __importDefault(require("path"));
const InstallService = (Service) => {
    const returnScript = (goServerConfig) => {
        if (goServerConfig.scripts)
            return {
                script: path_1.default
                    .resolve(__dirname, "goserver.scripts.js")
                    .replace(/\\/g, "/"),
            };
        if (goServerConfig.type === "static")
            return {
                script: path_1.default
                    .resolve(__dirname, "goserver-express-server.js")
                    .replace(/\\/g, "/"),
            };
        return {
            script: path_1.default.resolve(__dirname, goServerConfig.entry).replace(/\\/g, "/"),
        };
    };
    const service = new Service(Object.assign(Object.assign(Object.assign({}, goserver_config_json_1.default.service), { name: goserver_config_json_1.default.name }), returnScript(goserver_config_json_1.default)));
    if (goserver_config_json_1.default === null || goserver_config_json_1.default === void 0 ? void 0 : goserver_config_json_1.default.serviceConfigFunction) {
        const serviceConfigFunction = new Function(...goserver_config_json_1.default.serviceConfigFunction.args, goserver_config_json_1.default.serviceConfigFunction.body);
        serviceConfigFunction(service);
    }
    service.on("install", () => {
        service.start();
        console.log(`Service \`${goserver_config_json_1.default.name}\` installed successfully`);
    });
    service.install();
};
exports.default = InstallService;
