# stack-trace-fixer
Modify Node.js error stack traces to display relative paths.
That will be especially useful with Docker for navigating source code from the container's stack trace.

Usage:
1. install
```
import { installFix, uninstallFix } from './index.js';
installFix();
```

You can optionally provide 'pwd' parameter to installFix(), if process.env.PWD is not set.

1. catch and log an error
```
try {
  throw new Error('Test error');
} catch (error) {
  console.error(error.stack)
}
```

Your error.stack contains relative paths now, so you can easily navigate to the source code from the container.

You can also optionally use the `uninstallFix` function to remove the fix.

```
uninstallFix();
```

