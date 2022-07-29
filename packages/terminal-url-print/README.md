# terminal-url-print

when run in terminal, print and copy server url

## Installation

```sh
$ yarn add terminal-url-print --dev
```

## Use

```ts
import terminalUrlPrint from 'terminal-url-print';

terminalUrlPrint({port: '8080'});

// Change copy's path
terminalUrlPrint({port: '8080', copyType: 'ip'});
```
