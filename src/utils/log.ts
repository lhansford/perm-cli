import { program } from 'commander';

export function log(message: unknown): void {
  if (program.opts().debug) {
    console.log(message);
  }
}
