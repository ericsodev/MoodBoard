"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RefreshToken_1 = __importDefault(require("../models/RefreshToken"));
const router = (0, express_1.Router)();
router.use(express_1.default.json());
router.get("/auth/github", passport_1.default.authenticate("github", { session: false }));
router.get("/auth/callback/github", passport_1.default.authenticate("github", {
    failureRedirect: "/login",
    session: false,
}), function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const authToken = jsonwebtoken_1.default.sign({ id: userID }, process.env.JWT_AUTH_SECRET || "backupsecret", { expiresIn: 600 });
        const refreshToken = jsonwebtoken_1.default.sign({ id: userID }, process.env.JWT_REFRESH_SECRET || "backuprefreshsecret", { expiresIn: "30d" });
        yield RefreshToken_1.default.deleteMany({ user: userID });
        yield RefreshToken_1.default.create({ user: userID, refreshToken: refreshToken });
        res.cookie("authToken", authToken, {
            expires: new Date(Date.now() + 300000),
            sameSite: "strict",
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
        });
        res.redirect("http://localhost:3000/dashboard");
    });
});
router.get("/auth/token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
        return res.sendStatus(401);
    }
    try {
        if (!(yield RefreshToken_1.default.findOne({ refreshToken: refreshToken }))) {
            return res.sendStatus(403);
        }
        jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "backuprefreshsecret", (err, user) => {
            if (err)
                return res.sendStatus(403);
            const authToken = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user._id }, process.env.JWT_AUTH_SECRET || "backupsecret", { expiresIn: "1h" });
            res
                .cookie("authToken", authToken, {
                expires: new Date(Date.now() + 300000),
            })
                .sendStatus(200);
        });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}));
exports.default = router;
