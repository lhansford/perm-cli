#!/usr/bin/env node
import {program as $47BQW$program} from "commander";
import {differenceInDays as $47BQW$differenceInDays, addDays as $47BQW$addDays} from "date-fns";
import $47BQW$tinyinvariant from "tiny-invariant";
import {readdirSync as $47BQW$readdirSync, readFileSync as $47BQW$readFileSync} from "fs";
import {join as $47BQW$join} from "path";
import $47BQW$graymatter from "gray-matter";
import $47BQW$chalk from "chalk";


var $3647f841f639dcb9$exports = {};
$3647f841f639dcb9$exports = JSON.parse('{"name":"perm-cli","version":"0.2.2","description":"Perm is a lightweight Personal Relationship Management system for use with Markdown","main":"dist/index.js","source":"src/index.ts","type":"module","bin":{"perm":"dist/index.js"},"author":"Luke Hansford","license":"MIT","scripts":{"build":"parcel build --no-source-maps","lint:fix":"npm run lint --fix","lint":"eslint src --ext .js,.ts","start":"npm run build && node dist/index.js","test:watch":"jest --watchAll","test":"jest --config ./config/jest.config.js"},"devDependencies":{"@parcel/packager-ts":"^2.7.0","@parcel/transformer-typescript-types":"^2.7.0","@types/inquirer":"^9.0.1","@types/jest":"^28.1.7","eslint-config-lukehansford-base":"^1.2.2","eslint-plugin-jest-formatting":"^3.1.0","jest":"^28.1.3","parcel":"^2.7.0","ts-jest":"^28.0.8","typescript":"^4.7.4"},"dependencies":{"chalk":"5.0.1","commander":"^9.4.0","date-fns":"^2.29.1","gray-matter":"^4.0.3","tiny-invariant":"^1.2.0"},"@parcel/transformer-js":{"inlineFS":false,"inlineEnvironment":false},"targets":{"main":{"context":"node"}}}');




function $fda699075e262a94$export$4ff8436bc6d936d2(person) {
    (0, $47BQW$tinyinvariant)(person.birthDate, "birthDate is required");
    const today = new Date();
    const birthDay = typeof person.birthDate === "string" ? new Date(person.birthDate.toLowerCase().replace("xxxx", "1970")) : person.birthDate;
    if (birthDay.getMonth() <= today.getMonth() && birthDay.getDate() < today.getDate()) birthDay.setFullYear(today.getFullYear() + 1);
    else birthDay.setFullYear(today.getFullYear());
    return {
        person: person,
        birthDay: birthDay
    };
}





const $ae6ef0a8de332461$export$ba6483870cd55d63 = process.env.PERM_PEOPLE_DIR || "./.perm/people";


function $361f475d4079aece$var$splitTitleAndContent(content) {
    const lines = content.split("\n");
    const index = lines.findIndex((l)=>l.startsWith("# "));
    const title = index > -1 ? lines[index].split("# ")[1] : "Untitled";
    lines.splice(index, 1);
    const contentWithoutTitle = lines.join("\n");
    return [
        title,
        contentWithoutTitle
    ];
}
function $361f475d4079aece$var$getMarkdownFilesInDirectory(directory) {
    const files = (0, $47BQW$readdirSync)(directory, {
        withFileTypes: true
    });
    return files.filter((result)=>!result.isDirectory() && result.name.endsWith(".md"));
}
function $361f475d4079aece$var$getAndParseMarkdownFile(path) {
    const contents = (0, $47BQW$readFileSync)(path, {
        encoding: "utf8"
    });
    const { content: content , data: data  } = (0, $47BQW$graymatter)(contents);
    const [name, contentWithoutTitle] = $361f475d4079aece$var$splitTitleAndContent(content);
    // TODO: validate expected format here
    return {
        name: name,
        content: contentWithoutTitle,
        ...data
    };
}
function $361f475d4079aece$export$b9c97d5330cbe844() {
    return $361f475d4079aece$var$getMarkdownFilesInDirectory((0, $ae6ef0a8de332461$export$ba6483870cd55d63)).map((file)=>$361f475d4079aece$var$getAndParseMarkdownFile((0, $47BQW$join)((0, $ae6ef0a8de332461$export$ba6483870cd55d63), file.name)));
}


function $07df2b67c45349e5$export$572ab32d2956f8e3() {
    (0, $361f475d4079aece$export$b9c97d5330cbe844)().filter((p)=>p.birthDate).map((0, $fda699075e262a94$export$4ff8436bc6d936d2)).sort((a, b)=>a.birthDay.valueOf() - b.birthDay.valueOf()).forEach(({ person: person , birthDay: birthDay  })=>console.log(`${person.name} - ${(0, $47BQW$differenceInDays)(birthDay, new Date())} days to go (${birthDay.toDateString()})`));
}






function $450ec37c6fb6b5cf$var$getDaysOverdue({ lastContact: lastContact , contactFrequency: contactFrequency  }) {
    (0, $47BQW$tinyinvariant)(lastContact && contactFrequency);
    return (0, $47BQW$differenceInDays)(new Date(), (0, $47BQW$addDays)(new Date(lastContact), contactFrequency));
}
function $450ec37c6fb6b5cf$export$bdb193b58d921ecb() {
    const today = new Date();
    const duePeople = (0, $361f475d4079aece$export$b9c97d5330cbe844)().filter((person)=>{
        if (!person.contactFrequency) return false;
        if (!person.lastContact) return true;
        return (0, $47BQW$addDays)(new Date(person.lastContact), person.contactFrequency) < today;
    });
    duePeople.sort((a, b)=>$450ec37c6fb6b5cf$var$getDaysOverdue(a) - $450ec37c6fb6b5cf$var$getDaysOverdue(b)).reverse();
    duePeople.map((person)=>{
        const daysOverdue = $450ec37c6fb6b5cf$var$getDaysOverdue(person);
        const isVeryOverdue = daysOverdue > (person.contactFrequency || 0) * 2;
        const message = `${person.name} - ${daysOverdue} days overdue`;
        if (isVeryOverdue) console.log((0, $47BQW$chalk).red(message));
        else console.log((0, $47BQW$chalk).yellow(message));
    });
}



function $7de76989d1bfdab9$export$8837f4fc672e936d(_name, command) {
    const { group: group , interest: interest  } = command.opts();
    (0, $361f475d4079aece$export$b9c97d5330cbe844)().filter((person)=>{
        if (group) return person.groups && person.groups.includes(group);
        return true;
    }).filter((person)=>{
        if (interest) return person.interests && person.interests.includes(interest);
        return true;
    }).map((person)=>console.log(person.name));
}


function $0d76d4e293adcbb1$export$888e7c6a16f38cd() {
// TODO:
}


(0, $0d76d4e293adcbb1$export$888e7c6a16f38cd)();
(0, $47BQW$program).name((0, $3647f841f639dcb9$exports.name)).description((0, $3647f841f639dcb9$exports.description)).version((0, $3647f841f639dcb9$exports.version));
(0, $47BQW$program).command("due").description("List all people who haven't been contacted within the specified frequency range") // TODO: write a better desc.
.action((0, $450ec37c6fb6b5cf$export$bdb193b58d921ecb));
(0, $47BQW$program).command("birthdays").alias("bdays").description("List the next N birthdays (default is 10).") // TODO: write a better desc.
.action((0, $07df2b67c45349e5$export$572ab32d2956f8e3));
(0, $47BQW$program).command("ls").alias("list").description("List all people").option("-g, --group <groupName>", "List people in a group").option("-i, --interest <groupName>", "List people with an interest").action((0, $7de76989d1bfdab9$export$8837f4fc672e936d));
(0, $47BQW$program).parse();


