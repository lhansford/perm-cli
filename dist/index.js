import {program as $fU9C9$program} from "commander";
import {differenceInDays as $fU9C9$differenceInDays, addDays as $fU9C9$addDays} from "date-fns";
import $fU9C9$tinyinvariant from "tiny-invariant";
import {readdirSync as $fU9C9$readdirSync, readFileSync as $fU9C9$readFileSync} from "fs";
import {join as $fU9C9$join} from "path";
import $fU9C9$graymatter from "gray-matter";
import $fU9C9$chalk from "chalk";


var $97c14c9239d39cfb$exports = {};
$97c14c9239d39cfb$exports = JSON.parse('{"name":"perm-cli","version":"0.2.1","description":"Perm is a lightweight Personal Relationship Management system for use with Markdown","main":"dist/index.js","source":"src/index.ts","type":"module","bin":{"perm":"dist/index.js"},"author":"Luke Hansford","license":"MIT","scripts":{"build":"parcel build --no-source-maps","lint:fix":"npm run lint --fix","lint":"eslint src --ext .js,.ts","prepare":"husky install","start":"npm run build && node dist/index.js","test:watch":"jest --watchAll","test":"jest --config ./config/jest.config.js"},"devDependencies":{"@parcel/packager-ts":"^2.7.0","@parcel/transformer-typescript-types":"^2.7.0","@types/inquirer":"^9.0.1","@types/jest":"^28.1.7","eslint-config-lukehansford-base":"^1.2.2","eslint-plugin-jest-formatting":"^3.1.0","husky":"^8.0.1","jest":"^28.1.3","parcel":"^2.7.0","ts-jest":"^28.0.8","typescript":"^4.7.4"},"dependencies":{"chalk":"4.0.0","commander":"^9.4.0","date-fns":"^2.29.1","gray-matter":"^4.0.3","tiny-invariant":"^1.2.0"}}');




function $82c4483c76c1fed4$export$4ff8436bc6d936d2(person) {
    (0, $fU9C9$tinyinvariant)(person.birthDate, "birthDate is required");
    const today = new Date();
    const birthDay = typeof person.birthDate === "string" ? new Date(person.birthDate.toLowerCase().replace("xxxx", "1970")) : person.birthDate;
    if (birthDay.getMonth() <= today.getMonth() && birthDay.getDate() < today.getDate()) birthDay.setFullYear(today.getFullYear() + 1);
    else birthDay.setFullYear(today.getFullYear());
    return {
        person: person,
        birthDay: birthDay
    };
}





const $919dac8482145438$export$ba6483870cd55d63 = "/Users/luke/Library/Mobile Documents/iCloud~md~obsidian/Documents/notes/people";


function $77dbd201111934a3$var$splitTitleAndContent(content) {
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
function $77dbd201111934a3$var$getMarkdownFilesInDirectory(directory) {
    const files = (0, $fU9C9$readdirSync)(directory, {
        withFileTypes: true
    });
    return files.filter((result)=>!result.isDirectory() && result.name.endsWith(".md"));
}
function $77dbd201111934a3$var$getAndParseMarkdownFile(path) {
    const contents = (0, $fU9C9$readFileSync)(path, {
        encoding: "utf8"
    });
    const { content: content , data: data  } = (0, $fU9C9$graymatter)(contents);
    const [name, contentWithoutTitle] = $77dbd201111934a3$var$splitTitleAndContent(content);
    // TODO: validate expected format here
    return {
        name: name,
        content: contentWithoutTitle,
        ...data
    };
}
function $77dbd201111934a3$export$b9c97d5330cbe844() {
    return $77dbd201111934a3$var$getMarkdownFilesInDirectory((0, $919dac8482145438$export$ba6483870cd55d63)).map((file)=>$77dbd201111934a3$var$getAndParseMarkdownFile((0, $fU9C9$join)((0, $919dac8482145438$export$ba6483870cd55d63), file.name)));
}


function $456658185cf4e5ba$export$572ab32d2956f8e3() {
    (0, $77dbd201111934a3$export$b9c97d5330cbe844)().filter((p)=>p.birthDate).map((0, $82c4483c76c1fed4$export$4ff8436bc6d936d2)).sort((a, b)=>a.birthDay.valueOf() - b.birthDay.valueOf()).forEach(({ person: person , birthDay: birthDay  })=>console.log(`${person.name} - ${(0, $fU9C9$differenceInDays)(birthDay, new Date())} days to go (${birthDay.toDateString()})`));
}






function $5759efd30ed00a37$var$getDaysOverdue({ lastContact: lastContact , contactFrequency: contactFrequency  }) {
    (0, $fU9C9$tinyinvariant)(lastContact && contactFrequency);
    return (0, $fU9C9$differenceInDays)(new Date(), (0, $fU9C9$addDays)(new Date(lastContact), contactFrequency));
}
function $5759efd30ed00a37$export$bdb193b58d921ecb() {
    const today = new Date();
    const duePeople = (0, $77dbd201111934a3$export$b9c97d5330cbe844)().filter((person)=>{
        if (!person.contactFrequency) return false;
        if (!person.lastContact) return true;
        return (0, $fU9C9$addDays)(new Date(person.lastContact), person.contactFrequency) < today;
    });
    duePeople.sort((a, b)=>$5759efd30ed00a37$var$getDaysOverdue(a) - $5759efd30ed00a37$var$getDaysOverdue(b)).reverse();
    duePeople.map((person)=>{
        const daysOverdue = $5759efd30ed00a37$var$getDaysOverdue(person);
        const isVeryOverdue = daysOverdue > (person.contactFrequency || 0) * 2;
        const message = `${person.name} - ${daysOverdue} days overdue`;
        if (isVeryOverdue) console.log((0, $fU9C9$chalk).red(message));
        else console.log((0, $fU9C9$chalk).yellow(message));
    });
}



function $05fda69c028d7235$export$8837f4fc672e936d(_name, command) {
    const { group: group , interest: interest  } = command.opts();
    (0, $77dbd201111934a3$export$b9c97d5330cbe844)().filter((person)=>{
        if (group) return person.groups && person.groups.includes(group);
        return true;
    }).filter((person)=>{
        if (interest) return person.interests && person.interests.includes(interest);
        return true;
    }).map((person)=>console.log(person.name));
}


function $06c669253ecca66d$export$888e7c6a16f38cd() {
// TODO:
}


(0, $06c669253ecca66d$export$888e7c6a16f38cd)();
(0, $fU9C9$program).name((0, $97c14c9239d39cfb$exports.name)).description((0, $97c14c9239d39cfb$exports.description)).version((0, $97c14c9239d39cfb$exports.version));
(0, $fU9C9$program).command("due").description("List all people who haven't been contacted within the specified frequency range") // TODO: write a better desc.
.action((0, $5759efd30ed00a37$export$bdb193b58d921ecb));
(0, $fU9C9$program).command("birthdays").alias("bdays").description("List the next N birthdays (default is 10).") // TODO: write a better desc.
.action((0, $456658185cf4e5ba$export$572ab32d2956f8e3));
(0, $fU9C9$program).command("ls").alias("list").description("List all people").option("-g, --group <groupName>", "List people in a group").option("-i, --interest <groupName>", "List people with an interest").action((0, $05fda69c028d7235$export$8837f4fc672e936d));
(0, $fU9C9$program).parse();


