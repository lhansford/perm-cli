import { differenceInDays } from 'date-fns';
import invariant from 'tiny-invariant';

import { getPeople, Person } from '../utils/getPeople';

function formatBirthDate(person: Person) {
  invariant(person.birthDate, 'birthDate is required');

  const today = new Date();
  const birthDay = new Date(person.birthDate.toLowerCase().replace('xxxx', '1970'));

  if (birthDay.getMonth() <= today.getMonth() && birthDay.getDate() < today.getDate()) {
    birthDay.setFullYear(today.getFullYear() + 1);
  } else {
    birthDay.setFullYear(today.getFullYear());
  }

  return { person, birthDay };
}

export function birthdays(): void {
  getPeople()
    .filter((p) => p.birthDate)
    .map(formatBirthDate)
    .sort((a, b) => a.birthDay.valueOf() - b.birthDay.valueOf())
    .forEach(({ person, birthDay }) =>
      console.log(
        `${person.name} - ${differenceInDays(
          birthDay,
          new Date(),
        )} days to go (${birthDay.toDateString()})`,
      ),
    );
}
