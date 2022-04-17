const core = require('@actions/core');
const github = require('@actions/github');

try {
    const issuekey = core.getInput('issuekey').toLowerCase().replace(/[^a-z0-9,]/g, '')
    const keyarr = issuekey.split(',')
    if (core.getInput('prtitle')) {
        var title = core.getInput('prtitle')
    } else if (github.context.payload && github.context.payload.pull_request) {
        var title = github.context.payload.pull_request.title
    } else {
        core.setFailed('Could not get Pull Request Title (Action not run on a pull request?)')
    }
    title = title.toLowerCase()
    core.info(title)
    var passed = false
    for (let i = 0; i < keyarr.length; i++) {
        const pattern = '^(build|ci|chore|docs|feat|fix|perf|refactor|revert|style|task|test)(\\([\\w-,]*\\))?(:\\s)(' + keyarr[i] + '-\\d+|none)+(:)'
        const regex = new RegExp(pattern)
        if (regex.test(title)) {
            passed = true
        }
    }
    if (passed == false) {
        core.setFailed('PR Title must follow the format: type(scope?): ' + issuekey.toString() + '-123:. (The issue num may be repeated multiple times if needed).')
    }
} catch (error) {
    core.setFailed(error)
}
