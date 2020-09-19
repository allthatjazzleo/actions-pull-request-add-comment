"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message = core.getInput('message');
            const github_token = core.getInput('GITHUB_TOKEN');
            const context = github.context;
            if (context.payload.pull_request == null && context.payload.comment == null) {
                core.setFailed('No pull request or issue comment found.');
                return;
            }
            let issue_number;
            if (context.payload.pull_request != null) {
                issue_number = context.payload.pull_request.number;
            }
            if (context.payload.comment != null) {
                let issue_url = context.payload.comment.html_url;
                issue_url = issue_url.split('#').pop().split('?').pop();
                issue_number = issue_url.substring(issue_url.lastIndexOf('/') + 1);
            }
            const octokit = github.getOctokit(github_token);
            const asd = issue_number;
            yield octokit.issues.createComment(Object.assign(Object.assign({}, context.repo), { issue_number: issue_number, body: message }));
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
