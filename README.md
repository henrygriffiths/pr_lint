# PR Lint
This action makes sure PR titles are linted with commitlint and project management issue keys

Examples:

One issue key: `fix(deps): issue-123: fixing deps`

Multiple issue keys: `fix(deps): issue-123, key-1234: fixing deps`

# Usage
```yaml
- uses: henrygriffiths/pr_lint@v2
  with:
    # Required
    # Issue Key used in project management system
    # If multiple keys are used, separate via comma (eg: keya,keyb)
    issuekey: ''
    
    # Optional
    # Manually provide PR title via actions
    # Default: ${{ github.event.pull_request.title }}
    prtitle: ''
```


# License

This project is released under the [MIT License](LICENSE)
