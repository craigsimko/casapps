module.exports = function (config) {
  config.set({
    mutator: "typescript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress"],
    testRunner: "mocha",
    testFramework: "mocha",
    coverageAnalysis: "off",
    tsconfigFile: "tsconfig.json",
    mutate: ["src/**/*.ts"],
    mochaOptions: {
      files: ['test/**/*.ts'],
      spec: ['test/**/*.ts'],
      require: ['ts-node/register']
    },
  });
};
