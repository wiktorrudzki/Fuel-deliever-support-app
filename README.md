# Fuel-deliever-support-app

## Prerequisites

[Install Node.js.](https://nodejs.org/en/download/package-manager)
[Install .NET 8.](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
[Install Python.](https://www.python.org/downloads/)
[Install Docker.](https://docs.docker.com/engine/install/) (Nessecary if you want to contenerize a DB.)

## Setup

In `server` directory:

```console
dotnet restore
```

In `model` directory:

```console
pip install -r requirements.txt
```

In `client` directory:

```console
npm i
```

### Database

```console
docker compose up -d
```

In `server` directory:

```console
dotnet ef database update
```

## Run applications

Before launch DB have to be launched.
In first terminal window:

```console
cd model
python app.py
```

In second terminal window:

```console
cd server
dotnet run
```

In third terminal window:

```console
cd client
npm run dev
```

## Login

The app seeds two accounts for testing purposes.

- John Doe
  - email: john.doe@example.com
  - password: password123
- Alice Smith
  - email: alice.smith@example.com
  - password: qwerty456
