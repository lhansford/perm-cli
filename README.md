# 💇‍♀️ Perm

Perm is a lightweight Personal Relationship Management system (or PRM). It expects that you
document your relationships in a Markdown format and then provides some helpful utilities for
managing those.

## What is a PRM?

A Personal Relationship Management system is a system for capturing knowledge about the different personal relations you have in your life (somewhat similar to a [CRM](https://en.wikipedia.org/wiki/Customer_relationship_management) system). It might contain information about a person's birthday, interests, relationships, and anything else you might find relevant.

## Install

```sh
npm install -g perm-cli
```

By default it will look in the directory `./perm/people` for Markdown files, but you can specify
a different directory by setting the variable `PERM_PEOPLE_DIR` in your shell configuration file. E.g.:

```sh
export PERM_PEOPLE_DIR="/Users/$USER/Dropbox/People"
```

## Usage

`perm due` - List people who haven't been contacted in the specified time frame.

`perm birthdays` / `perm bdays` - List upcoming birthdays.

`perm list` / `perm ls` - List all people.

`perm list -g some-group` / `perm list --group some-group` - List all people within a group.

`perm list -i some-interest` / `perm list --interest some-interest` - List all people with a given interest.

## Philosophy

Perm is intended as a set of utilities for use with Markdown files. Reading and writing to these files are mostly out of the scope for this project (feel free to use whatever app makes sense to you for this). Instead Perm's intention is to make it simple to search/filter/list data contained within these Markdown files.

## Contributing

Run locally using:

`npm run start <YOUR_COMMAND>`

To create a release, update the version number and commit to `main`. Then create a release in Github
(using the automated release notes).
