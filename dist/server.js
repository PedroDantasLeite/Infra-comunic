"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
let port = process.env.PORT || index_1.default.PORT;
index_1.default.server.listen(port, function () {
    console.log(`server running in" + ${port}`);
});
