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
        while (_) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.PackBuilder = void 0;
var util_1 = require("./util");
var ipfs_util_1 = require("./ipfs-util");
var pure_1 = require("./pure");
var debug = require('debug')('DPack:builder');
var PackBuilder = /** @class */ (function () {
    function PackBuilder(network) {
        (0, util_1.need)(network, 'new PackBuilder(network) - network must be defined');
        (0, util_1.need)(typeof (network) === 'string', 'new PackBuilder(network) - network must be a string');
        (0, util_1.need)(network !== 'mainnet', 'You may not use \'mainnet\' as a network name. You might mean \'ethereum\'.');
        (0, util_1.need)(network !== '', 'Network name cannot be empty.');
        this._pack = (0, pure_1.blank)(network);
        (0, pure_1.assertValidPack)(this._pack);
    }
    PackBuilder.prototype.packType = function (t, pin) {
        if (pin === void 0) { pin = false; }
        return __awaiter(this, void 0, void 0, function () {
            var cid, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, ipfs_util_1.putIpfsJson)(t.artifact, pin)];
                    case 1:
                        cid = (_a.sent()).toString();
                        info = (0, util_1.copy)(t);
                        info.artifact = { '/': cid };
                        this._pack = (0, pure_1.addType)(this._pack, info);
                        return [4 /*yield*/, Promise.resolve(this)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PackBuilder.prototype.addType = function (t) {
        this._pack = (0, pure_1.addType)(this._pack, t);
        return this;
    };
    PackBuilder.prototype.packObject = function (o, alsoPackType, pin) {
        if (alsoPackType === void 0) { alsoPackType = true; }
        if (pin === void 0) { pin = false; }
        return __awaiter(this, void 0, void 0, function () {
            var cid, info, pack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, ipfs_util_1.putIpfsJson)(o.artifact, pin)];
                    case 1:
                        cid = (_a.sent()).toString();
                        info = (0, util_1.copy)(o);
                        info.artifact = { '/': cid };
                        pack = (0, pure_1.addObject)(this._pack, info);
                        if (alsoPackType) {
                            pack = (0, pure_1.addType)(pack, {
                                typename: info.typename,
                                artifact: info.artifact
                            });
                        }
                        this._pack = pack;
                        return [4 /*yield*/, Promise.resolve(this)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PackBuilder.prototype.addObject = function (o) {
        this._pack = (0, pure_1.addObject)(this._pack, o);
        return this;
    };
    PackBuilder.prototype.merge = function () {
        var packs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            packs[_i] = arguments[_i];
        }
        this._pack = pure_1.merge.apply(void 0, __spreadArray([this._pack], packs, false));
        return this;
    };
    PackBuilder.prototype.build = function () {
        (0, pure_1.assertValidPack)(this._pack);
        return (0, util_1.copy)(this._pack);
    };
    return PackBuilder;
}());
exports.PackBuilder = PackBuilder;
