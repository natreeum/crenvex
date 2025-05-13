#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// parse arguments
const args = process.argv.slice(2);

let inputFile = null;
let outputFile = null;
let noEmptyLines = false;
let noComments = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith("-")) {
    if (arg === "--no-empty-lines" || arg === "-nel") {
      noEmptyLines = true;
    } else if (arg === "--no-comments" || arg === "-nc") {
      noComments = true;
    } else if (arg === "--output" || arg === "-o") {
      if (args[i + 1].startsWith("-")) {
        console.error(`🔴[ERROR] Missing output file name after ${arg}`);
        process.exit(1);
      }
      outputFile = args[i + 1];
      i++;
    }
  } else {
    inputFile = arg;
  }
}

// default file names
inputFile = inputFile || ".env";
outputFile = outputFile || ".env.example";

const fullPath = path.resolve(process.cwd(), inputFile);

// check if input file exists
if (!fs.existsSync(fullPath)) {
  console.error(`🔴[ERROR] File not found: ${inputFile}`);
  process.exit(1);
}

// load file content
const content = fs.readFileSync(fullPath, "utf-8");

const exampleLines = content
  .split(/\r?\n/)
  .map((line) => {
    const trimmed = line.trim();

    if (trimmed === "") {
      return noEmptyLines ? null : "";
    }

    if (trimmed.startsWith("#")) {
      return noComments ? null : line;
    }

    const [key] = line.split("=");
    return key ? `${key}=` : "";
  })
  .filter((line) => line !== null);

const outputContent = exampleLines.join("\n");

fs.writeFileSync(path.resolve(process.cwd(), outputFile), outputContent, {
  encoding: "utf-8",
});
console.log(`✅[SUCCESS] Example file created: ${outputFile}`);
