var reporter = require('cucumber-html-reporter');

var options = {
  theme: 'bootstrap',
  jsonFile: './reports/cucumberReport.json',
  output: './reports/cucumberReport.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  brandTitle: 'Feature Tests',
  columnLayout: 1
  // metadata: {
  // }
};

reporter.generate(options);