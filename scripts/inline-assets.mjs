import { readFile, readdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const outputDirectory = "dist";
const mimeTypes = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const dataUri = async (relativePath) => {
  const mimeType = mimeTypes[extname(relativePath).toLowerCase()];
  if (!mimeType) return null;

  try {
    const contents = await readFile(join(outputDirectory, relativePath));
    return `data:${mimeType};base64,${contents.toString("base64")}`;
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
};

const inlineCssImages = async (css) => {
  const matches = [...css.matchAll(/url\((["']?)(images\/[^)'"?#]+)\1\)/g)];

  for (const match of matches) {
    const uri = await dataUri(match[2]);
    if (uri) css = css.replace(match[0], `url("${uri}")`);
  }

  return css;
};

const stylesheet = await inlineCssImages(
  await readFile(join(outputDirectory, "styles.css"), "utf8"),
);
const files = await readdir(outputDirectory);

for (const filename of files.filter((name) => name.endsWith(".html"))) {
  const filePath = join(outputDirectory, filename);
  let html = await readFile(filePath, "utf8");

  html = html.replace(
    /<link\s+rel=["']stylesheet["']\s+href=["']styles\.css["']\s*\/?>/i,
    `<style>\n${stylesheet}\n</style>`,
  );

  const imageMatches = [...html.matchAll(/\bsrc=(["'])(images\/[^"']+)\1/g)];
  for (const match of imageMatches) {
    const uri = await dataUri(match[2]);
    if (uri) html = html.replace(match[0], `src=${match[1]}${uri}${match[1]}`);
  }

  await writeFile(filePath, html);
}

