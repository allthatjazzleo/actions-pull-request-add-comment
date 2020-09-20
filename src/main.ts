import * as core from '@actions/core'
import * as github from '@actions/github'

async function run() {
  try {
    const message = core.getInput('message');
    const github_token = core.getInput('GITHUB_TOKEN');

    const context = github.context;
    if (context.payload.pull_request == null && context.payload.issue == null) {
        core.setFailed('No pull request or issue comment found.');
        return;
    }
    let issue_number :number | undefined;
    if (context.payload.pull_request != null) {
      issue_number = context.payload.pull_request.number;
    }
    if (context.payload.issue != null) {
      issue_number = context.payload.issue.number;
    }

    const octokit = github.getOctokit(github_token);
    await octokit.issues.createComment({
        ...context.repo,
        issue_number: issue_number as number,
        body: message
      });

  } catch (error) {
    core.setFailed(error.message);
    return;
  }
}

run();
