const core = require('@actions/core');
const github = require('@actions/github');

try {
    const issuekeys = core.getInput('issuekey').toLowerCase().replace(/[^a-z0-9,]/g, '').replace(',', '|')
    if (core.getInput('prtitle')) {
        var title = core.getInput('prtitle')
    } else if (github.context.payload && github.context.payload.pull_request) {
        var title = github.context.payload.pull_request.title
    } else {
        core.setFailed('Could not get Pull Request Title (Action not run on a pull request?)')
    }
    title = title.toLowerCase()
    core.info(title)
    const pattern = '^(build|ci|chore|docs|feat|fix|perf|refactor|revert|style|task|test)(\\([\\w-,]*\\))?(!)?(:\\s)((' + issuekeys + ')-\\d+|none)(,\\ (' + issuekeys + ')-\\d+)*(:\\s)'
    const regex = new RegExp(pattern)
    if (!regex.test(title)) {
        core.setFailed('PR Title must follow the format: type(scope?): ' + issuekeys.toString() + '-123:. (The issue num may be repeated multiple times (comma separated) if needed).')
    }
} catch (error) {
    core.setFailed(error)
}
