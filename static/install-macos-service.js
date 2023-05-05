"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mac_1 = require("node-mac");
const install_service_1 = __importDefault(require("./install-service"));
(0, install_service_1.default)(node_mac_1.Service);
