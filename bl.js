#!/usr/bin/env node
/**
 * bl — unified backlog CLI.
 *
 * Usage:
 *   bl <command> [args...]
 *
 * Commands:
 *   init       Initialize backlog in a repo
 *   new        Create a new story
 *   workon     Start/resume work on a story
 *   list       Show active story worktrees
 *   done       Mark a story as done
 *   sync       Regenerate backlog index files
 *   cleanup    Merge, sync, push, remove worktree
 */

const command = process.argv[2];
const subArgv = process.argv.slice(3);

function printHelp() {
  console.log(`Usage: bl <command> [args...]

Commands:
  init       Initialize backlog in a repo
  new        Create a new story
  workon     Start/resume work on a story
  list       Show active story worktrees
  done       Mark a story as done
  sync       Regenerate backlog index files
  cleanup    Merge, sync, push, remove worktree`);
}

async function run() {
  switch (command) {
    case "init": {
      const { main } = await import("./init.js");
      return main(subArgv);
    }
    case "new": {
      const { main } = await import("./new.js");
      return main(subArgv);
    }
    case "workon": {
      const { main } = await import("./workon.js");
      return main(subArgv);
    }
    case "list": {
      const { main } = await import("./workon.js");
      return main(["--list", ...subArgv]);
    }
    case "done": {
      const { main } = await import("./done.js");
      return main(subArgv);
    }
    case "sync": {
      const { main } = await import("./sync.js");
      return main(subArgv);
    }
    case "cleanup": {
      const { main } = await import("./workon.js");
      return main(["--cleanup", ...subArgv]);
    }
    case "help":
    case "-h":
    case "--help":
    case undefined:
      printHelp();
      break;
    default:
      console.error(`bl: unknown command '${command}'`);
      console.error("Run 'bl help' for usage.");
      process.exit(1);
  }
}

run().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
