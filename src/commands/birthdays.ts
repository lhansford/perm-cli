import { differenceInDays } from 'date-fns';

import { formatBirthDate } from '../utils/formatBirthDate';
import { getPeople } from '../utils/getPeople';

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
