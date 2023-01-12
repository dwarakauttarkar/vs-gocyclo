"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCyclomaticThresholdDescription = void 0;
function getCyclomaticThresholdDescription(complexity) {
    if (complexity <= 10) {
        return "GOOD";
    }
    if (complexity <= 20) {
        return "MODERATE";
    }
    if (complexity <= 30) {
        return "COMPLEX";
    }
    if (complexity <= 40) {
        return "EXTREMELY COMPLEX";
    }
    if (complexity >= 50) {
        return "INSANE";
    }
    return "";
}
exports.getCyclomaticThresholdDescription = getCyclomaticThresholdDescription;
//# sourceMappingURL=threshold.js.map