import chalk from 'chalk';
import { addDays, differenceInDays } from 'date-fns';

import { getPeople, Person } from '../utils/getPeople';
import { log } from '../utils/log';

function getDaysOverdue({ lastContact, contactFrequency, created, name }: Person): number {
  log(`Getting days overdue for ${name}`);

  if (!contactFrequency) {
    throw new Error('Only users with a contact frequency should be passed to this function.');
  }

  return differenceInDays(
    new Date(),
    addDays(new Date(lastContact || created || '1970-01-01'), contactFrequency),
  );
}

export function due() {
  const today = new Date();
  const duePeople = getPeople().filter((person) => {
    if (!person.contactFrequency) {
      return false;
    }
    if (!person.lastContact) {
      return true;
    }

    return addDays(new Date(person.lastContact), person.contactFrequency) < today;
  });

  duePeople.sort((a, b) => getDaysOverdue(a) - getDaysOverdue(b)).reverse();

  duePeople.map((person) => {
    const daysOverdue = getDaysOverdue(person);
    const isVeryOverdue = daysOverdue > (person.contactFrequency || 0) * 2;
    const message = `${person.name} - ${daysOverdue} days overdue`;

    if (isVeryOverdue) {
      console.log(chalk.red(message));
    } else {
      console.log(chalk.yellow(message));
    }
  });
}
