import * as fs from "fs";

const recursiveDir = (path: string) => {
  console.log(path);
  fs.readdirSync(path).forEach((entry) => {
    if (entry.startsWith(".")) {
      // skip it!
    } else {
      const full = path + "/" + entry;
      const stats = fs.lstatSync(full);
      if (stats.isSymbolicLink()) {
        console.log("L ", full); // symlink, don't follow
      } else if (stats.isDirectory()) {
        console.log("D ", full);
        recursiveDir(full);
      } else {
        console.log("  ", full);
      }
    }
  });
};

/*
  If you don't have a /boot directory,
  the following will fail; substitute
  another directory instead.
*/
recursiveDir("/boot");

export {};
