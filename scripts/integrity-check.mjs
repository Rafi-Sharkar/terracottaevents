#!/usr/bin/env node
/**
 * File integrity checker — detects tampering in critical config files.
 *
 * Usage:
 *   node scripts/integrity-check.mjs update   — compute and save hashes
 *   node scripts/integrity-check.mjs check    — verify hashes match saved values
 *
 * The lock file (.integrity.lock) should be committed so CI and teammates
 * can detect if any config file is modified outside a normal commit.
 */

import { readFile, writeFile } from 'fs/promises';
import { createHash } from 'crypto';
import { join, relative } from 'path';

const ROOT = process.cwd();
const LOCK_FILE = join(ROOT, '.integrity.lock');

// Files whose content should only change via intentional commits
const CRITICAL_FILES = [
  'prettier.config.mjs',
  'tsconfig.json',
  'tsconfig.build.json',
  'nest-cli.json',
  'package.json',
  'pnpm-lock.yaml',
  'prisma.config.ts',
  '.gitignore',
];

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

async function hashFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    return sha256(content);
  } catch {
    return null;
  }
}

async function loadLock() {
  try {
    const raw = await readFile(LOCK_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function update() {
  const hashes = {};
  for (const file of CRITICAL_FILES) {
    const hash = await hashFile(join(ROOT, file));
    if (hash) {
      hashes[file] = hash;
      console.log(`  hashed  ${file}`);
    } else {
      console.log(`  skipped ${file} (not found)`);
    }
  }
  hashes['_updated'] = new Date().toISOString();
  await writeFile(LOCK_FILE, JSON.stringify(hashes, null, 2) + '\n');
  console.log(`\n✓ Integrity lock written to .integrity.lock\n`);
}

async function check() {
  const lock = await loadLock();
  if (!lock) {
    console.error('No .integrity.lock found. Run: node scripts/integrity-check.mjs update');
    process.exit(1);
  }

  let passed = 0;
  let failed = 0;

  for (const file of CRITICAL_FILES) {
    const savedHash = lock[file];
    if (!savedHash) {
      console.log(`  skip    ${file} (not in lock)`);
      continue;
    }

    const currentHash = await hashFile(join(ROOT, file));
    if (!currentHash) {
      console.log(`  missing ${file} (file not found)`);
      continue;
    }

    if (currentHash === savedHash) {
      passed++;
      console.log(`  ✓  ${file}`);
    } else {
      failed++;
      console.log(`  ✗  ${file}  — HASH MISMATCH (possible tampering)`);
    }
  }

  console.log(`\n${passed} passed, ${failed} failed.\n`);

  if (failed > 0) {
    console.error(
      'One or more critical files have changed since the last integrity update.\n' +
      'If this is intentional, run: node scripts/integrity-check.mjs update\n' +
      'If unexpected, inspect the file for injected code before proceeding.\n',
    );
    process.exit(1);
  }
}

const command = process.argv[2];
if (command === 'update') {
  console.log('Updating integrity hashes...\n');
  update().catch((err) => { console.error(err.message); process.exit(1); });
} else if (command === 'check') {
  console.log('Checking file integrity...\n');
  check().catch((err) => { console.error(err.message); process.exit(1); });
} else {
  console.error('Usage: node scripts/integrity-check.mjs [update|check]');
  process.exit(1);
}
