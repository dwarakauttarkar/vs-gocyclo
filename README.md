# vs-gocyclo README

[NOTE: THIS EXTENSION IS IN BETA STAGE]
This extension provides cyclomatic complexity for a go lang file.


## Features

1. Shows the cyclomatic complexity of a go file.
2. Prints total function level complexity in output channel.

## Extension Settings

1. specify the gopath in `go.gopath` in the settings.json.

## Known Issues

1. Average complexity rendering is one key stroke lagging.

## Release Notes

### 1.0.0

* Initial release for the Plugin, only average complexity of the file is shown.

### 1.0.1

* Show total Complexity for the current file at function level when the status bar item at the bottom is clicked.
* New Command "GoCyclo: Get Total Complexity" to generate the function level complexity.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)


## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
