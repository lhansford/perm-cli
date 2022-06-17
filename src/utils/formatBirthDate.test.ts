import { add, format, sub } from 'date-fns';

import { formatBirthDate } from './formatBirthDate';
import { Person } from './getPeople';

function stripTime(date: Date): void {
  date.setUTCMilliseconds(0);
  date.setUTCSeconds(0);
  date.setUTCMinutes(0);
  date.setUTCHours(0);
}

const person: Person = { content: '', name: 'Test' };

describe('formatBirthDate', () => {
  describe('With a date object', () => {
    describe('Date has passed', () => {
      it('Should format the date', () => {
        const testDate = sub(new Date(), { days: 1 });
        stripTime(testDate);
        const birthDate = format(testDate, 'yyyy-MM-dd');

        expect(formatBirthDate({ ...person, birthDate }).birthDay).toEqual(
          add(testDate, { years: 1 }),
        );
      });
    });

    describe('Date is today', () => {
      it('Should format the date', () => {
        const testDate = new Date();
        stripTime(testDate);
        const birthDate = format(testDate, 'yyyy-MM-dd');

        expect(formatBirthDate({ ...person, birthDate }).birthDay).toEqual(testDate);
      });
    });

    describe('Date has not passed', () => {
      it('Should format the date', () => {
        const testDate = add(new Date(), { days: 1 });
        stripTime(testDate);
        const birthDate = format(testDate, 'yyyy-MM-dd');

        expect(formatBirthDate({ ...person, birthDate }).birthDay).toEqual(testDate);
      });
    });
  });

  describe('With a full date', () => {
    describe('Date has passed', () => {
      it('Should format the date', () => {
        const testDate = sub(new Date(), { days: 1 });
        stripTime(testDate);
        const birthDate = format(testDate, '1999-MM-dd');

        expect(formatBirthDate({ ...person, birthDate }).birthDay).toEqual(
          add(testDate, { years: 1 }),
        );
      });
    });

    describe('Date is today', () => {
      it('Should format the date', () => {
        const testDate = new Date();
        stripTime(testDate);
        const birthDate = format(testDate, '1999-MM-dd');

        expect(formatBirthDate({ ...person, birthDate }).birthDay).toEqual(testDate);
      });
    });

    describe('Date has not passed', () => {
      it('Should format the date', () => {
        const testDate = add(new Date(), { days: 1 });
        stripTime(testDate);
        const birthDate = format(testDate, '1999-MM-dd');

        expect(formatBirthDate({ ...person, birthDate }).birthDay).toEqual(testDate);
      });
    });
  });

  describe('With a date with no year', () => {
    describe('Date has passed', () => {
      it('Should format the date', () => {
        const testDate = sub(new Date(), { days: 1 });
        stripTime(testDate);
        const birthDate = format(testDate, `'XXXX'-MM-dd`);

        expect(formatBirthDate({ ...person, birthDate }).birthDay).toEqual(
          add(testDate, { years: 1 }),
        );
      });
    });

    describe('Date is today', () => {
      it('Should format the date', () => {
        const testDate = new Date();
        stripTime(testDate);
        const birthDate = format(testDate, `'XXXX'-MM-dd`);

        expect(formatBirthDate({ ...person, birthDate }).birthDay).toEqual(testDate);
      });
    });

    describe('Date has not passed', () => {
      it('Should format the date', () => {
        const testDate = add(new Date(), { days: 1 });
        stripTime(testDate);
        const birthDate = format(testDate, `'XXXX'-MM-dd`);

        expect(formatBirthDate({ ...person, birthDate }).birthDay).toEqual(testDate);
      });
    });
  });
});
