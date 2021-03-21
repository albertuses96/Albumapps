# Technical test AccelByte Frontend

## Getting started: 

```
  npm i
  npm start
```

## Architecture: 

```
project
│   README.md
│   postcss.config.js
|   purgecss.config.js
|   tsconfig.json 
│
└───src
    │   index.html
    │   main.tsx
    |   routes.tsx
    |   styles.css
    |   global.d.ts
    │
    └───domain  // contains entities
    |
    └───driver  // contains data source from remote or cache
    |
    └───interface 
    |
    └───presenter // UI layer
    |
    └───repository // data layer return from data source
    |
    └───useCase // Use case combines data from User and Post Repositories.
    |
    └───store // state management (react-sweet-state)
    |
    └───utils


```

- Bundler: Parcel
- Styling: Tailwind CSS
- Persist state: secured-ls
- Search: Fuzzy search