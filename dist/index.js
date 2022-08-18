var $iEn1Z$commander = require("commander");
var $iEn1Z$datefns = require("date-fns");
var $iEn1Z$tinyinvariant = require("tiny-invariant");
var $iEn1Z$fs = require("fs");
var $iEn1Z$path = require("path");
var $iEn1Z$graymatter = require("gray-matter");
var $iEn1Z$chalk = require("chalk");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

var $17e2a7c06afd6377$exports = {};
$17e2a7c06afd6377$exports = JSON.parse('{"name":"perm-cli","version":"0.2.0","description":"Perm is a lightweight Personal Relationship Management system for use with Markdown","main":"dist/index.js","source":"src/index.ts","bin":{"perm":"dist/index.js"},"author":"Luke Hansford","license":"MIT","scripts":{"watch":"parcel watch","build":"parcel build --no-source-maps","lint":"yarn eslint src --ext .js,.ts","lint:fix":"yarn lint --fix","start":"yarn build && node dist/index.js","test":"jest --config ./config/jest.config.js","test:watch":"jest --watchAll","type-check":"tsc --noEmit","type-check:watch":"yarn type-check -- --watch"},"devDependencies":{"@babel/cli":"^7.17.6","@babel/core":"^7.17.8","@babel/preset-env":"^7.16.11","@babel/preset-typescript":"^7.16.7","@parcel/packager-ts":"^2.7.0","@parcel/transformer-typescript-types":"^2.7.0","@rollup/plugin-commonjs":"^22.0.0","@rollup/plugin-json":"^4.1.0","@rollup/plugin-node-resolve":"^13.1.3","@rollup/plugin-typescript":"^8.3.1","@types/inquirer":"^8.2.0","@types/jest":"^27.4.1","babel-jest":"^27.5.1","eslint":"^8.12.0","eslint-config-lukehansford-base":"^1.2.1","eslint-plugin-jest-formatting":"^3.1.0","jest":"^27.5.1","parcel":"^2.7.0","prettier":"^2.6.1","rollup":"^2.70.1","rollup-plugin-preserve-shebangs":"^0.2.0","typescript":"^4.6.3"},"dependencies":{"chalk":"5.0.1","commander":"^9.1.0","date-fns":"^2.28.0","gray-matter":"^4.0.3","tiny-invariant":"^1.2.0"}}');




function $319a1006367c4b8e$export$4ff8436bc6d936d2(person) {
    (0, ($parcel$interopDefault($iEn1Z$tinyinvariant)))(person.birthDate, "birthDate is required");
    const today = new Date();
    const birthDay = typeof person.birthDate === "string" ? new Date(person.birthDate.toLowerCase().replace("xxxx", "1970")) : person.birthDate;
    if (birthDay.getMonth() <= today.getMonth() && birthDay.getDate() < today.getDate()) birthDay.setFullYear(today.getFullYear() + 1);
    else birthDay.setFullYear(today.getFullYear());
    return {
        person: person,
        birthDay: birthDay
    };
}





const $c122116bdd400350$export$ba6483870cd55d63 = "/Users/luke/Library/Mobile Documents/iCloud~md~obsidian/Documents/notes/people";


function $da7c0848a9ce07ee$var$splitTitleAndContent(content) {
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
function $da7c0848a9ce07ee$var$getMarkdownFilesInDirectory(directory) {
    const files = (0, $iEn1Z$fs.readdirSync)(directory, {
        withFileTypes: true
    });
    return files.filter((result)=>!result.isDirectory() && result.name.endsWith(".md"));
}
function $da7c0848a9ce07ee$var$getAndParseMarkdownFile(path) {
    const contents = (0, $iEn1Z$fs.readFileSync)(path, {
        encoding: "utf8"
    });
    const { content: content , data: data  } = (0, ($parcel$interopDefault($iEn1Z$graymatter)))(contents);
    const [name, contentWithoutTitle] = $da7c0848a9ce07ee$var$splitTitleAndContent(content);
    // TODO: validate expected format here
    return {
        name: name,
        content: contentWithoutTitle,
        ...data
    };
}
function $da7c0848a9ce07ee$export$b9c97d5330cbe844() {
    return $da7c0848a9ce07ee$var$getMarkdownFilesInDirectory((0, $c122116bdd400350$export$ba6483870cd55d63)).map((file)=>$da7c0848a9ce07ee$var$getAndParseMarkdownFile((0, $iEn1Z$path.join)((0, $c122116bdd400350$export$ba6483870cd55d63), file.name)));
}


function $04630a22f1f738df$export$572ab32d2956f8e3() {
    (0, $da7c0848a9ce07ee$export$b9c97d5330cbe844)().filter((p)=>p.birthDate).map((0, $319a1006367c4b8e$export$4ff8436bc6d936d2)).sort((a, b)=>a.birthDay.valueOf() - b.birthDay.valueOf()).forEach(({ person: person , birthDay: birthDay  })=>console.log(`${person.name} - ${(0, $iEn1Z$datefns.differenceInDays)(birthDay, new Date())} days to go (${birthDay.toDateString()})`));
}






function $d6c9bb67a675f23d$var$getDaysOverdue({ lastContact: lastContact , contactFrequency: contactFrequency  }) {
    (0, ($parcel$interopDefault($iEn1Z$tinyinvariant)))(lastContact && contactFrequency);
    return (0, $iEn1Z$datefns.differenceInDays)(new Date(), (0, $iEn1Z$datefns.addDays)(new Date(lastContact), contactFrequency));
}
function $d6c9bb67a675f23d$export$bdb193b58d921ecb() {
    const today = new Date();
    const duePeople = (0, $da7c0848a9ce07ee$export$b9c97d5330cbe844)().filter((person)=>{
        if (!person.contactFrequency) return false;
        if (!person.lastContact) return true;
        return (0, $iEn1Z$datefns.addDays)(new Date(person.lastContact), person.contactFrequency) < today;
    });
    duePeople.sort((a, b)=>$d6c9bb67a675f23d$var$getDaysOverdue(a) - $d6c9bb67a675f23d$var$getDaysOverdue(b)).reverse();
    duePeople.map((person)=>{
        const daysOverdue = $d6c9bb67a675f23d$var$getDaysOverdue(person);
        const isVeryOverdue = daysOverdue > (person.contactFrequency || 0) * 2;
        const message = `${person.name} - ${daysOverdue} days overdue`;
        if (isVeryOverdue) console.log((0, ($parcel$interopDefault($iEn1Z$chalk))).red(message));
        else console.log((0, ($parcel$interopDefault($iEn1Z$chalk))).yellow(message));
    });
}



function $29f3d62dab60e6d4$export$8837f4fc672e936d(_name, command) {
    const { group: group , interest: interest  } = command.opts();
    (0, $da7c0848a9ce07ee$export$b9c97d5330cbe844)().filter((person)=>{
        if (group) return person.groups && person.groups.includes(group);
        return true;
    }).filter((person)=>{
        if (interest) return person.interests && person.interests.includes(interest);
        return true;
    }).map((person)=>console.log(person.name));
}


function $b475f93f9e4bfaac$export$888e7c6a16f38cd() {
// TODO:
}


(0, $b475f93f9e4bfaac$export$888e7c6a16f38cd)();
(0, $iEn1Z$commander.program).name((0, $17e2a7c06afd6377$exports.name)).description((0, $17e2a7c06afd6377$exports.description)).version((0, $17e2a7c06afd6377$exports.version));
(0, $iEn1Z$commander.program).command("due").description("List all people who haven't been contacted within the specified frequency range") // TODO: write a better desc.
.action((0, $d6c9bb67a675f23d$export$bdb193b58d921ecb));
(0, $iEn1Z$commander.program).command("birthdays").alias("bdays").description("List the next N birthdays (default is 10).") // TODO: write a better desc.
.action((0, $04630a22f1f738df$export$572ab32d2956f8e3));
(0, $iEn1Z$commander.program).command("ls").alias("list").description("List all people").option("-g, --group <groupName>", "List people in a group").option("-i, --interest <groupName>", "List people with an interest").action((0, $29f3d62dab60e6d4$export$8837f4fc672e936d));
(0, $iEn1Z$commander.program).parse();


