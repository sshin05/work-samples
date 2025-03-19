class SlowestTestFilesReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
    this._slowFiles = {};
  }

  onRunComplete(contexts, results) {
    const rootPathRegex = new RegExp(`^${process.cwd()}`);
    var allTestTime = this._allTestTime();

    console.log();
    const slowestFiles = Object.entries(this._slowFiles)
      .sort(([, durationA], [, durationB]) => durationB - durationA)
      .slice(0, this._options.numFiles || 10);
      var slowTestTime = this._slowTestTime(slowestFiles);
      var percentTime = slowTestTime / allTestTime * 100;

    console.log(`\x1b[33mTop ${slowestFiles.length} slowest test files, ${percentTime.toFixed(1)}% of total time):\x1b[0m`);
    console.log();

    slowestFiles.forEach(([filePath, duration], index) => {
      console.log(`\x1b[92m  ${index + 1}.  ${filePath.replace(rootPathRegex, '.')}\x1b[0m`);
      console.log(`      \x1b[31m${duration / 1000} seconds\x1b[0m`);
      console.log();
    });
    console.log();
  }

  onTestResult(test, testResult) {
    const filePath = testResult.testFilePath;
    const duration = testResult.testResults.reduce((totalDuration, result) => {
      return totalDuration + result.duration;
    }, 0);

    if (this._slowFiles[filePath]) {
      this._slowFiles[filePath] += duration;
    } else {
      this._slowFiles[filePath] = duration;
    }
  }

  _slowTestTime(slowestFiles) {
    var slowTestTime = 0;
    for (var i = 0; i < slowestFiles.length; i++) {
      slowTestTime += slowestFiles[i][1];
    }
    return slowTestTime;
  }

  _allTestTime() {
    var allTestTime = 0;
    const times = Object.values(this._slowFiles)
    for (var i = 0; i < times.length; i++) {
      allTestTime += times[i];
    }
    return allTestTime;
  }
}

module.exports = SlowestTestFilesReporter;