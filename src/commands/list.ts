import { getPeople } from "../utils/getPeople";

export function list(): void {
  getPeople().map((person) => console.log(person.name));
}
