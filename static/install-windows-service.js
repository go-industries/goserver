"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_windows_1 = require("node-windows");
const install_service_1 = __importDefault(require("./install-service"));
(0, install_service_1.default)(node_windows_1.Service);
