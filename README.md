﻿# Fuel-deliever-support-app

## Before backend

Run db:

```console
docker compose up -d
```

Run migrations:

```console
dotnet ef database update
```

Run model:

```console
cd model
python app.py
```
