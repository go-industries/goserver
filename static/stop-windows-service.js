"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_windows_1 = require("node-windows");
const stop_service_1 = __importDefault(require("./stop-service"));
(0, stop_service_1.default)(node_windows_1.Service);
