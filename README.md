# Snipcode

Snipcode is an open-source code-sharing platform that makes it easy to create code snippets and sharing it with the world.

[![Website](https://snipcode.dev/assets/og.png)](https://snipcode.dev)


## Key Features
* Create private or public code snippets with tags
* Browse and search into public code snippets
* Create folder to group your code snippets by category
* Generate a link to share a code snippet
* Import code snippet from GitHub Gist
* Add comments to a code snippet

## Tech Stack
* [Node.js](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/)
* [GraphQL](https://graphql.org/)
* [MySQL 8 through PlanetScale](https://planetscale.com/)
* [Prisma](https://www.prisma.io/)
* [Tailwind CSS](https://tailwindcss.com/)
* [AWS](https://aws.amazon.com)

## Project Structure
```text
snipcode
├─ apps
│  ├─ core
│  ├─ functions
│  │  ├─ code-embed
│  ├─ web
├─ packages
│  ├─ database
│  ├─ embed
│  ├─ domain
│  ├─ front
│  ├─ logger
│  ├─ utils
package.json
tsconfig.base.json
tsconfig.json
turbo.json
vercel.json
```

## Contributing
Kindly read our [Contributing Guide](./CONTRIBUTING.md) to learn and understand about our development process, how to propose bug fixes and improvements, and how to build and test your changes to Snipcode. 

## License

This project is developed under the [MIT License](/LICENSE)

