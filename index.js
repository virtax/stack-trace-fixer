let _prepareStackTrace;

export function installFix(pwd = process.env.PWD) {
  if (_prepareStackTrace) {
    throw new Error("You can't installFix twice");
  }
  _prepareStackTrace = Error.prepareStackTrace;

  if (pwd) {
    // prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[])
    Error.prepareStackTrace = (err, stackTraces) => {
      console.log('prepareStackTrace')
      // need to call original prepareStackTrace to correctly process typescript files
      const original = _prepareStackTrace(err, stackTraces);
      return original.replaceAll('file://'+pwd, '.').replaceAll(pwd, '.');
    };
  } else {
    throw new Error('Please provide "pwd" parameter');
  }
}

export function uninstallFix() {
  if (!_prepareStackTrace) {
    throw new Error("You need to installFix before uninstallFix and can't uninstallFix twice");
  }
  Error.prepareStackTrace = _prepareStackTrace;
  _prepareStackTrace = null;
}
