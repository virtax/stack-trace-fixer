# stack-trace-fixer
Modify Node.js error stack traces to display relative paths.
That will be especially useful with Docker for navigating source code from the container's stack trace.

Stack trace example without fixer:
```js
app-1  | TypeError: this.model.find is not a function
app-1  |     at CustomerService.find (/home/node/app/src/services/CustomerService.ts:10:29)
app-1  |     at <anonymous> (/home/node/app/src/routes/customerRouter.ts:50:45)
app-1  |     at Layer.handle [as handle_request] (/home/node/app/node_modules/express/lib/router/layer.js:95:5)
```



Stack trace example with fixer and relative paths:
```js
app-1  | TypeError: this.model.find is not a function
app-1  |     at CustomerService.find (./src/services/CustomerService.ts:10:29)
app-1  |     at <anonymous> (./src/routes/customerRouter.ts:50:45)
app-1  |     at Layer.handle [as handle_request] (./node_modules/express/lib/router/layer.js:95:5)
```

Usage:

1. Install
```js
import { installFix, uninstallFix } from 'stack-trace-fixer';
installFix();
```

You can optionally provide 'pwd' parameter to installFix(), if process.env.PWD is not set.

2. Catch and log an error
```js
try {
  throw new Error('Test error');
} catch (error) {
  console.error(error.stack)
}
```

Your error.stack contains relative paths now, so you can easily navigate to the source code from the container.

3. You can also optionally use the 'uninstallFix' function to remove the fix.

```js
uninstallFix();
```

