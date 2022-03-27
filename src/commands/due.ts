import chalk from 'chalk';
import { addDays, differenceInDays } from 'date-fns';
import invariant from 'tiny-invariant';

import { getPeople, Person } from '../utils/getPeople';

function getDaysOverdue({ lastContact, contactFrequency }: Person): number {
  invariant(lastContact && contactFrequency);

  return differenceInDays(new Date(), addDays(new Date(lastContact), contactFrequency));
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
