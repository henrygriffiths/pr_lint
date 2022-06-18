const core = require('@actions/core');
const github = require('@actions/github');

try {
    const issuekeys = core.getInput('issuekey').toLowerCase().replace(/[^a-z0-9,]/g, '').replace(/[,]/g, '|')
    if (core.getInput('prtitle')) {
        var title = core.getInput('prtitle')
    } else if (github.context.payload && github.context.payload.pull_request) {
        var title = github.context.payload.pull_request.title
    } else {
        core.setFailed('Could not get Pull Request Title (Action not run on a pull request?)')
    }
    if (core.getInput('types')) {
        var types = core.getInput('types').toLowerCase().replace(/[|]/g, '').replace(/[,]/g, '|')
    } else {
        var types = 'build|ci|chore|docs|feat|fix|perf|refactor|revert|style|task|test'
    }
    if (core.getInput('allownokey')) {
        var allownokey = core.getBooleanInput('allownokey')
    } else {
        var allownokey = true
    }
    if (core.getInput('nokeyword')) {
        var nokeyword = core.getInput('nokeyword').toLowerCase().replace(/[^a-z]/g, '')
    } else {
        var nokeyword = 'none'
    }
    if (allownokey) {
        var allownokeyregex = '|' + nokeyword
    } else {
        var allownokeyregex = ''
    }
    title = title.toLowerCase()
    core.info(title)
    const pattern = '^(' + types + ')(\\(([\\w-]|,\\ )+\\))?(!)?(:\\ )((' + issuekeys + ')-\\d+' + allownokeyregex + ')(,\\ (' + issuekeys + ')-\\d+)*(:\\ )'
    const regex = new RegExp(pattern)
    if (!regex.test(title)) {
        core.setFailed('PR Title must follow the format: type(scope?): ' + issuekeys.toString() + '-123:. (The issue key and num may be repeated multiple times (comma separated) if needed).')
    }
} catch (error) {
    core.setFailed(error)
}
