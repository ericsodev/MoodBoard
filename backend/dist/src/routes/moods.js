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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const Entry_1 = __importDefault(require("../models/Entry"));
const router = (0, express_1.Router)();
router.use(passport_1.default.authenticate("jwt", { session: false }));
router.get("/entries", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (typeof req.query.start !== "string" &&
        typeof req.query.end !== "string") {
        res.sendStatus(400);
    }
    const entries = yield Entry_1.default.find({
        user: id,
        date: {
            $gte: new Date(Number(req.query.start)),
            $lte: new Date(Number(req.query.end)),
        },
    });
    res.json(entries);
}));
router.post("/entry", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const entry = yield Entry_1.default.findOneAndUpdate({
        user: id,
        date: req.body.date,
    }, { $set: { mood: req.body.mood } }, { upsert: true, new: true });
    res.json(entry);
}));
router.delete("/entry", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const dateStart = new Date(req.body.date);
    const dateEnd = new Date(req.body.date);
    try {
        const entry = yield Entry_1.default.findOneAndDelete({
            user: id,
            date: new Date(req.body.date).toDateString(),
        });
        if (entry) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
