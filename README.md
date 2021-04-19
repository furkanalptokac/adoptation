# adoptation
Adoptation is a pet adoption social platform and also my final year project which is still under development.

## Getting Started

### Installation
To use Adoptation on your machine, first clone this project on your local machine:

```bash
git clone https://github.com/furkanalptokac/adoptation.git
# or Github CLI or smt...
```

After you clone the project:

```bash
cd adoptation
```

When you changed your directory to project directory:

```bash
# to install server's and also client's dependencies
yarn
yarn client-install
```

After installing all dependencies, create a `.env` file inside adoptation and add application's configurations to your `.env` file.

```env
HOST=
EMAIL=
EMAIL_PORT=
EMAIL_PW=
DB=
```

If you want to start with Docker, you have to change proxy value `localhost` to `server` in `package.json` inside client folder first. Because, server is not running under `localhost` on Docker. If you want to start on AWS, you have to set proxy value to server's Public IPv4 address.

```json
"proxy": "http://server:5000/"
```

```bash
docker-compose build
docker-compose up
```

After all, you can start the project with:

```bash
yarn dev
```

## License

Distributed under the [MIT License](https://github.com/furkanalptokac/adoptation/blob/main/LICENSE).
