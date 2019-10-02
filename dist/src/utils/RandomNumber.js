"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.default = generateRandomNumber;
//# sourceMappingURL=RandomNumber.js.map