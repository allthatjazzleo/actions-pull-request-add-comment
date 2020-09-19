import * as core from '@actions/core'
import * as github from '@actions/github'

async function run() {
  try {
    const message = core.getInput('message');
    const github_token = core.getInput('GITHUB_TOKEN');

    const context = github.context;
    if (context.payload.pull_request == null && context.payload.comment == null) {
        core.setFailed('No pull request or issue comment found.');
        return;
    }
    let issue_number :number | undefined;
    if (context.payload.pull_request != null) {
      issue_number = context.payload.pull_request.number;
    }
    if (context.payload.comment != null) {
      let issue_url = context.payload.comment.html_url;
      issue_url = issue_url.split('#').pop().split('?').pop();
      issue_number = issue_url.substring(issue_url.lastIndexOf('/') + 1);
    }

    const octokit = github.getOctokit(github_token);
    const asd = issue_number
    await octokit.issues.createComment({
        ...context.repo,
        issue_number: issue_number as number,
        body: message
      });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
