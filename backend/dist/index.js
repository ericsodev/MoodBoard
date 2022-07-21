"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./src/routes/auth"));
const moods_1 = __importDefault(require("./src/routes/moods"));
const user_1 = __importDefault(require("./src/routes/user"));
const passport_1 = __importDefault(require("./src/passport"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const PORT = 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:3000" }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use("/", auth_1.default);
app.use("/api", moods_1.default);
app.use("/user", user_1.default);
mongoose_1.default.connect(process.env.MONGO_REMOTE_URL || "").then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});
