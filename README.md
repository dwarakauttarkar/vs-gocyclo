# vs-gocyclo

This extension provides cyclomatic complexity for a go lang projects

### Limitations
- Currently works only on Mac & Linux.

### Prerequisites
- go lang version > 1.16 installed

## Features

### Shows the average cyclomatic complexity of a go file.
![average](3_average_for_current_file.jpeg)

---

### Get analysis of all functions in a file
#### A) Click on the status bar item at the bottom to get function level complexity analysis
![all functions in file](4_click_status_bar_item_for_func_analysis.png)

#### Example 2: Click on the status bar item at the bottom.
![all functions in file](4b_cick_sbi_to_get_file_average%20.png)

---

### Get package level analysis on right-clicking folder
#### Right click the package/folder
![package level analysis](5_select_from_menu_right_click.png)

#### Total complexity shown in output channel
![package level analysis](6_package_level_all_functions.png)

---

## Commands Available
1. `GoCyclo: Run Go Cyclo` - Activates/Reloads the extenstion.
2. `GoCyclo: Toggle Show/Hide Complexity Bar` - Show/Hide status bar item.
3. `GoCyclo: Get Total Complexity` - Shows file level analysis for open file

## Known Issues

1. Average complexity rendering is one key stroke lagging.

## Release Notes

### 0.0.1

* Initial release for the Plugin, only average complexity of the file is shown.

### 1.0.0

* Show total Complexity for the current file at function level when the status bar item at the bottom is clicked.
* New Command "GoCyclo: Get Total Complexity" to generate the function level complexity.

---

**Enjoy!**
