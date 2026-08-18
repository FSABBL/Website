# FSABBL — Biomedical & Bioinformatics Laboratory

The official website for the Fulton Science Academy Biomedical & Bioinformatics Laboratory (FSABBL). The site introduces the laboratory, its research groups, student projects, and opportunities to participate.

## View the website

Open [`index.html`](./index.html) in a web browser or visit the deployed GitHub Pages site when available.

## Password-protected deployment

The GitHub Pages deployment embeds local styles and images into each page, then encrypts every HTML page with [StatiCrypt](https://github.com/robinmoisson/staticrypt). Visitors must enter the shared password before the browser decrypts and displays a page. The password is never committed to this repository, and local images are not deployed as separate public files.

### GitHub setup

1. Open the repository's **Settings → Secrets and variables → Actions**.
2. Create a repository secret named `STATICRYPT_PASSWORD` containing a long, unique password (at least 16 characters).
3. Open **Settings → Pages** and select **GitHub Actions** as the source.
4. Run the **Deploy password-protected site** workflow, or push a commit to `main`.
5. Give authorized visitors the password through a separate, private channel.

To change or revoke the shared password, replace the `STATICRYPT_PASSWORD` secret and rerun the workflow. Visitors can select “Remember me” for seven days.

### Local encrypted build

After installing dependencies, provide the password as an environment variable and run the build:

```bash
npm install
STATICRYPT_PASSWORD='use-a-long-unique-password' npm run build
```

The encrypted site is written to `dist/`, which is excluded from Git.

### Why StatiCrypt

StatiCrypt was selected instead of a hidden hashed directory or PageCrypt. A hidden directory leaves the original files unencrypted, while StatiCrypt encrypts their contents. PageCrypt provides similar client-side encryption, but StatiCrypt has a maintained npm CLI, supports several pages in one build, offers a shared “Remember me” flow, and currently uses a substantially higher PBKDF2 work factor. Those features make it a better fit for this multi-page GitHub Pages deployment.

> [!IMPORTANT]
> Client-side encryption protects the deployed HTML only. It is not user authentication, it cannot identify individual visitors, and anyone who knows the shared password can pass it on. The repository must be private if its unencrypted source should also be confidential. Do not use this design for highly sensitive personal, medical, financial, or regulated information.

## Creator credit and required attribution

This website was designed and developed by **[kx11z](https://github.com/kx11z)**.

You may copy, adapt, publish, display, or redistribute a substantial portion of this website only if you give clear credit to the original creator. The credit must be reasonably visible to people viewing your copy or adaptation—for example, in the website footer, an About/Credits page linked from the footer, or accompanying documentation—and must include the creator name and a working link to this repository.

Use this exact credit unless written permission to use different wording is granted:

> Based on the FSABBL website, originally designed and developed by [kx11z](https://github.com/kx11z/Biology-and-Informatics-Lab---Fulton-Science-Academy).

Removing the creator credit, hiding it only in source code, or presenting the original work as your own does not satisfy these reuse terms. Modified versions must also state that changes were made.

These conditions apply only to material for which the repository owner holds the copyright. They do not restrict fair use, fair dealing, public-domain material, or other uses permitted by law. Names, logos, trademarks, and third-party material are not licensed unless expressly stated.

## Citation

When this website is used as a source in research, coursework, publications, or presentations, cite it as:

> kx11z. (2026). *FSABBL — Biomedical & Bioinformatics Laboratory* [Website]. GitHub. https://github.com/kx11z/Biology-and-Informatics-Lab---Fulton-Science-Academy

BibTeX:

```bibtex
@misc{kx11z_fsabbl_2026,
  author       = {kx11z},
  title        = {FSABBL — Biomedical & Bioinformatics Laboratory},
  year         = {2026},
  howpublished = {Website},
  url          = {https://github.com/kx11z/Biology-and-Informatics-Lab---Fulton-Science-Academy}
}
```

## Repository contents

- `index.html` — the complete static website, including its HTML and CSS

## Contact and permission requests

For permission to reuse the website without the attribution above, contact the repository owner through [GitHub](https://github.com/kx11z).

## Copyright

Copyright © 2026 kx11z. All rights reserved except for the limited, attribution-required permission stated above.
# Website
