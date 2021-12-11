const core = require('@actions/core');
const github = require('@actions/github');

try {
    const jirakey = core.getInput('jirakey').toLowerCase().replace(' ', '')
    const pattern = '^(build|ci|chore|docs|feat|fix|perf|refactor|revert|style|task|test)(.*)(:\\s)(' + jirakey + '-\\d+\\s*|none)+(:)'
    const regex = new RegExp(pattern)
    if (github.context.payload && github.context.payload.pull_request) {
        title = github.context.payload.pull_request.title
        title = title.toLowerCase()
    }
    core.info(title)
    if (!(regex.test(title))) {
        core.setFailed('PR Title must follow the format: type(scope?): ' + jirakey + '-123:. (The Jira Issue num may be repeated multiple times if needed).')
    }
} catch (error) {
    core.setFailed(error)
}
