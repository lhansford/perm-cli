import { Command } from 'commander';

import { getPeople } from '../utils/getPeople';

export function list(_name: string, command: Command): void {
  const { group, interest } = command.opts();
  getPeople()
    .filter((person) => {
      if (group) {
        return person.groups && person.groups.includes(group);
      }

      return true;
    })
    .filter((person) => {
      if (interest) {
        return person.interests && person.interests.includes(interest);
      }

      return true;
    })
    .map((person) => console.log(person.name));
}
