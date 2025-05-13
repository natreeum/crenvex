# crenvex

> 🛠️ Generate `.env.example` files easily from `.env`-style environment files.

**crenvex** is a lightweight CLI tool to help you generate `.env.example` files from your existing `.env` files. It removes sensitive values while optionally preserving or removing comments and blank lines.

---

## 📦 Installation

Install globally via npm:

```bash
npm install -g crenvex
```

or use it directly with npx:

```bash
npx crenvex
```

---

## 🚀 Usage

```bash
crenvex [inputFile] [options]
```

- Default for

* inputFile : .env
* --output <file> : .env.example

## ⚙️ Options

| Option           | Alias | Description                                |
| ---------------- | ----- | ------------------------------------------ |
| --output <file>  | -o    | Specify output filename                    |
| --no-empty-lines | -nel  | Remove all empty lines from the output     |
| --no-comments    | -nc   | Remove all comment lines (starting with #) |

---

## 📘 Examples

### Basic usage

```bash
npx crenvex
```

### Specify an input file

```bash
npx crenvex .env.local
```

### Specify both input and output file

```bash
npx crenvex .env.local -o .env.local.example
```

### Remove comments

```bash
npx crenvex -nc
```

### Remove Empty lines

```bash
npx crenvex -nel
```
