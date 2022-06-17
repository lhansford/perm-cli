import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

import { PEOPLE_DIR } from '../constants';

export interface Person {
  created?: Date; // YYYY-MM-DD
  updated?: Date; // YYYY-MM-DD
  lastContact?: Date; // YYYY-MM-DD
  contactFrequency?: number; // Days
  birthDate?: Date | string; // YYYY-MM-DD
  aliases?: string[];
  name: string;
  content: string;
  groups?: string[];
  interests?: string[];
  [key: string]: unknown;
}

function splitTitleAndContent(content: string): [string, string] {
  const lines = content.split('\n');
  const index = lines.findIndex((l) => l.startsWith('# '));
  const title = index > -1 ? lines[index].split('# ')[1] : 'Untitled';

  lines.splice(index, 1);
  const contentWithoutTitle = lines.join('\n');

  return [title, contentWithoutTitle];
}

function getMarkdownFilesInDirectory(directory: string): ReturnType<typeof readdirSync> {
  const files = readdirSync(directory, { withFileTypes: true });
  return files.filter((result) => !result.isDirectory() && result.name.endsWith('.md'));
}

function getAndParseMarkdownFile(path: string): Person {
  const contents = readFileSync(path, { encoding: 'utf8' });
  const { content, data } = matter(contents);
  const [name, contentWithoutTitle] = splitTitleAndContent(content);

  // TODO: validate expected format here

  return {
    name,
    content: contentWithoutTitle,
    ...data,
  };
}

export function getPeople(): Person[] {
  return getMarkdownFilesInDirectory(PEOPLE_DIR).map((file) =>
    getAndParseMarkdownFile(join(PEOPLE_DIR, file.name)),
  );
}
