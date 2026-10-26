# Arcana public devlog

- This repository owns the static public website, not the Unreal game source or APKs. Public URL: https://vdecommerce.github.io/arcana-devlog/.
- Edit content in `content/`; `scripts/build.mjs` generates ignored `dist/`. No package installation is needed. Run `npm run build`, `npm run check` and `git diff --check` before publication.
- Update current status in `content/site.json` and affected world pages when adding a meaningful milestone to `content/posts.json`. Preserve historical article and screenshot labels.
- Distinguish Linux regressions, automated Quest fixtures, actual player observations and measured VR performance. Synthetic save persistence does not prove recovery of a player-completed journey. Installed local builds and Meta channel builds are separate.
- Images require a `content/media.json` entry. Label concept art, Blender prototypes, Windows previews and actual headset captures accurately. Never publish source assets, APKs, credentials, device identifiers, private logs or local machine paths.
- Preserve existing changes. Use a topic branch and review through a pull request. A merge to `main` triggers `.github/workflows/pages.yml`; verify the deployment and live updated pages before reporting publication complete.
- See README.md for content conventions and historical milestones. The latest verified public status belongs in content, not this instruction file.
