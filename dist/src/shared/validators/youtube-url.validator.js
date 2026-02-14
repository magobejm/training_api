"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsYoutubeUrl = void 0;
const class_validator_1 = require("class-validator");
let IsYoutubeUrl = class IsYoutubeUrl {
    validate(text) {
        if (!text)
            return false;
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
        return regex.test(text);
    }
    defaultMessage() {
        return 'URL ($value) must be a valid YouTube URL';
    }
};
exports.IsYoutubeUrl = IsYoutubeUrl;
exports.IsYoutubeUrl = IsYoutubeUrl = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isYoutubeUrl', async: false })
], IsYoutubeUrl);
//# sourceMappingURL=youtube-url.validator.js.map