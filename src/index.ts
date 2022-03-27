#!/usr/bin/env node
import { program } from 'commander';

import { version, description, name } from './../package.json';
import { due } from './commands/due';
import { verifyPeopleDirectory } from './utils/verifyPeopleDirectory';

verifyPeopleDirectory();

program.name(name).description(description).version(version);

program.command('due')
  .description("List all people who haven't been contacted within the specified frequency range") // TODO: write a better desc.
  .action(due);

program.parse();
