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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.isCid = exports.isV0CID = exports.pinIpfsCid = exports.putIpfsJson = exports.getIpfsJson = exports.stopHelia = void 0;
var cid_1 = require("multiformats/cid");
var os = require('os');
var path = require('path');
var debug = require('debug')('dpack');
var es6loader = require('../es6loader');
var hnode = null;
function getHelia() {
    return __awaiter(this, void 0, void 0, function () {
        var createHelia, fsBlockstore, storePath, store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(hnode === null)) return [3 /*break*/, 4];
                    return [4 /*yield*/, es6loader.loadModule('helia', 'createHelia')];
                case 1:
                    createHelia = _a.sent();
                    return [4 /*yield*/, es6loader.loadModule('blockstore-fs', 'FsBlockstore')];
                case 2:
                    fsBlockstore = _a.sent();
                    storePath = path.join(os.homedir(), '.dpack', 'blockstore');
                    store = new fsBlockstore(storePath);
                    return [4 /*yield*/, createHelia({ blockstore: store })];
                case 3:
                    hnode = _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, hnode];
            }
        });
    });
}
function stopHelia() {
    return __awaiter(this, void 0, void 0, function () {
        var helia;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHelia()];
                case 1:
                    helia = _a.sent();
                    return [4 /*yield*/, helia.stop()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.stopHelia = stopHelia;
function getHeliaJson() {
    return __awaiter(this, void 0, void 0, function () {
        var heliaJson, helia;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, es6loader.loadModule('@helia/json', 'json')];
                case 1:
                    heliaJson = _a.sent();
                    return [4 /*yield*/, getHelia()];
                case 2:
                    helia = _a.sent();
                    return [2 /*return*/, heliaJson(helia)];
            }
        });
    });
}
function getIpfsJson(cid) {
    return __awaiter(this, void 0, void 0, function () {
        var heliaJson, cidObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHeliaJson()];
                case 1:
                    heliaJson = _a.sent();
                    cidObject = typeof cid === 'string' ? cid_1.CID.parse(cid) : cid;
                    return [4 /*yield*/, heliaJson.get(cidObject)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getIpfsJson = getIpfsJson;
function putIpfsJson(obj, pin) {
    if (pin === void 0) { pin = false; }
    return __awaiter(this, void 0, void 0, function () {
        var heliaJson, cid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHeliaJson()];
                case 1:
                    heliaJson = _a.sent();
                    return [4 /*yield*/, heliaJson.add(obj, { pin: pin })];
                case 2:
                    cid = _a.sent();
                    return [2 /*return*/, cid.toString()];
            }
        });
    });
}
exports.putIpfsJson = putIpfsJson;
function pinIpfsCid(cid) {
    return __awaiter(this, void 0, void 0, function () {
        var helia, cidObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHelia()];
                case 1:
                    helia = _a.sent();
                    cidObject = typeof cid === 'string' ? cid_1.CID.parse(cid) : cid;
                    return [4 /*yield*/, helia.pins.add(cidObject)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.pinIpfsCid = pinIpfsCid;
// 'If a CID is 46 characters starting with "Qm", it's a CIDv0'
// https://docs.ipfs.io/concepts/content-addressing/#identifier-formats
function isV0CID(cidStr) {
    return (cidStr.length == 46 && cidStr.slice(0, 2) == 'Qm');
}
exports.isV0CID = isV0CID;
function isCid(cidStr) {
    try {
        cid_1.CID.parse(cidStr);
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.isCid = isCid;
process.on('beforeExit', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, stopHelia()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
