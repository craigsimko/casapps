#!/usr/bin/env node

import * as program from 'commander';
import Macro from './Macro';

const macro = new Macro();

program
  .command('record <macroName>')
  .action((macroName) => {
    console.log(`Press "Pause/Break" to start recording: ${macroName}`);
    macro
      .record(macroName)
      .then((p) => {
        process.exit();
      });
  });

program
  .command('run <macroName>')
  .action((macroName) => {
    macro
      .run(macroName)
      .then(() => {
        process.exit();
      });
  });

program
  .command('ps')
  .action(() => {
    macro.list();
    process.exit();
  });

program
  .command('delete <macroName>')
  .action((macroName) => {
    if (macro.delete(macroName)) {
      console.log(`${macroName} deleted`);
    } else {
      console.log(`${macroName} does not exist`);
    }
    process.exit();
  });

program.parse(process.argv); // notice that we have to parse in a new statement.
