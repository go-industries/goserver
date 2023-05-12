"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_linux_1 = require("node-linux");
const start_service_1 = __importDefault(require("./start-service"));
(0, start_service_1.default)(node_linux_1.Service);
