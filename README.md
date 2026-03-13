# Dark Studio

Dark Studio is a student game development team building its first project. This website is a professional, honest presentation of the team, their learning goals, and their current Unreal Engine project.

## Features
- Dark, cinematic UI with subtle particle background
- Responsive layout for desktop and mobile
- Studio, project, and team sections based on real data
- JSON-driven content for easy updates
- Smooth scroll and gentle animations

## Project Structure
```
/dark-studio
  index.html
  style.css
  script.js
  /data
      studio.json
      team.json
      project.json
  /assets
      /images
      /team
      /game
  README.md
```

## Data Files
- `data/studio.json` contains basic studio information.
- `data/team.json` contains real team members, roles, and responsibilities.
- `data/project.json` contains the current project details.

## Installation
This repository is not meant to be installed as a package. It is a static website.

To view it locally, open `index.html` in a browser or use a simple local server.

PowerShell example:
```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000/dark-studio/`.

## GitHub Pages Deployment
1. Push the repository to GitHub.
2. In the repo, go to Settings → Pages.
3. Under Source, select `Deploy from a branch`.
4. Choose branch `main` and folder `/ (root)`.
5. Save. GitHub Pages will publish the site and show the public URL.
