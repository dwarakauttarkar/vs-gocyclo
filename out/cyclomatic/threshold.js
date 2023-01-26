"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaintainabilityRemark = void 0;
function getMaintainabilityRemark(complexity) {
    if (complexity >= 80) {
        return "⭐⭐⭐⭐⭐";
    }
    if (complexity >= 60) {
        return "⭐⭐⭐⭐";
    }
    if (complexity >= 50) {
        return "⭐⭐⭐";
    }
    if (complexity >= 20) {
        return "⭐⭐";
    }
    if (complexity >= 1) {
        return "⭐";
    }
    return "🚫";
}
exports.getMaintainabilityRemark = getMaintainabilityRemark;
//# sourceMappingURL=threshold.js.map