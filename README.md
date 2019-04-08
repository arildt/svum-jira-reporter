# svum-jira-reporter

Collects Jira data for the SVUM project.

## Usage

`$ node index --out ~/path/to/your/output/file.xlsx`

### CLI arguments

* `out` (String) The desired file path to your Jira data file.

### Environment Variables

* `JIRA_HOST`: The host of the running Jira instance. Must not include protocol.
* `JIRA_USERNAME`: The username of the user with which to retrieve the data.
* `JIRA_PASSWORD`: The password of the user with which to retrieve the data.

If the environment variables are not set upon script execution, the script will ask you for the configuration.