# sahiplenn

Sahiplenn is a pet adoption social platform and also my final year project which is still under development.

## Getting Started

### Installation
To use Sahiplenn on your machine, first clone this project on your local machine:

```bash
git clone https://github.com/furkanalptokac/sahiplenn.git
# or Github CLI or smt...
```

After you clone the project:

```bash
cd sahiplenn
```

When you changed your directory to project directory:

```bash
# to install server's and also client's dependencies
yarn
yarn client-install
```

Or, start with Docker:

```bash
docker-compose build
docker-compose up
```

After installing all dependencies, create a `.env` file inside sahiplenn and add application's configurations to your `.env` file.

```env
HOST=
EMAIL=
EMAIL_PORT=
EMAIL_PW=
DB=
```

After all, you can start the project with:

```bash
yarn dev
```

## License

Distributed under the [MIT License](https://github.com/furkanalptokac/sahiplenn/blob/main/LICENSE).
