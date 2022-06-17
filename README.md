# 💇‍♀️ Perm

Perm is a lightweight Personal Relationship Management system (or PRM). It expects that you
document your relationships in a Markdown format and then provides some helpful utilities for
managing those.

## What is a PRM?

TODO:

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

TODO:

## Contributing

Run locally using:

`yarn start <YOUR_COMMAND>`

To deploy, just update the version number and commit to `main`. Make sure to run `yarn build` before
commiting.
