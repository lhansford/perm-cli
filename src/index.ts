#!/usr/bin/env node
import { program } from 'commander';

import { version, description, name } from './../package.json';
import { birthdays } from './commands/birthdays';
import { due } from './commands/due';
import { list } from './commands/list';
import { verifyPeopleDirectory } from './utils/verifyPeopleDirectory';

verifyPeopleDirectory();

program.name(name).description(description).version(version);

program.option('--debug', 'Enable debug logging', false);

program
  .command('due')
  .description("List all people who haven't been contacted within the specified frequency range") // TODO: write a better desc.
  .action(due);

program
  .command('birthdays')
  .alias('bdays')
  .description('List the next N birthdays (default is 10).') // TODO: write a better desc.
  .action(birthdays);

program
  .command('ls')
  .alias('list')
  .description('List all people')
  .option('-g, --group <groupName>', 'List people in a group')
  .option('-i, --interest <groupName>', 'List people with an interest')
  .action(list);

program.parse(process.argv);
