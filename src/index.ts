#!/usr/bin/env node

const args = process.argv.slice(2)

if (args.includes("--help") || args.includes("-h")) {
  console.log("cache-router-skill CLI")
  console.log("Usage: cache-router [--help]")
  process.exit(0)
}

console.log("cache-router-skill initialized")
