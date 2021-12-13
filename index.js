const core = require('@actions/core');
const github = require('@actions/github');

try {
    const issuekey = core.getInput('issuekey').toLowerCase().replace(/ /g, '')
    const pattern = '^(build|ci|chore|docs|feat|fix|perf|refactor|revert|style|task|test)(.*)(:\\s)(' + issuekey + '-\\d+\\s*|none)+(:)'
    const regex = new RegExp(pattern)
    if (github.context.payload && github.context.payload.pull_request) {
        var title = github.context.payload.pull_request.title
        title = title.toLowerCase()
    }
    core.info(title)
    if (!(regex.test(title))) {
        core.setFailed('PR Title must follow the format: type(scope?): ' + issuekey + '-123:. (The issue num may be repeated multiple times if needed).')
    }
} catch (error) {
    core.setFailed(error)
}
