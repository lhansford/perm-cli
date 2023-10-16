import { Person } from './getPeople';

export function formatBirthDate(person: Person) {
  if (!person.birthDate) {
    throw new Error('birthDate is required');
  }

  const today = new Date();
  const birthDay =
    typeof person.birthDate === 'string'
      ? new Date(person.birthDate.toLowerCase().replace('xxxx', '1970'))
      : person.birthDate;

  if (birthDay.getMonth() <= today.getMonth() && birthDay.getDate() < today.getDate()) {
    birthDay.setFullYear(today.getFullYear() + 1);
  } else {
    birthDay.setFullYear(today.getFullYear());
  }

  return { person, birthDay };
}
