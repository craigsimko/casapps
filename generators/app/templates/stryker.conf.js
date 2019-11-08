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
      files: ['tests/unit-tests/**/*.ts'],
      spec: ['tests/unit-tests/**/*.ts'],
      require: ['ts-node/register']
    },
  });
};
