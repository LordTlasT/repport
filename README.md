# Requirements
- mariadb database, for creating the user and tables, this project ships files under the`sql` directory.

# Installation
```sh
npm install
```
Also create a config.json file:
```json
{
    "host": "localhost",
    "user": "node",
    "password": "space123",
    "database": "nodedb"
}
```

# Running
```sh
npm run start
```

# Categories API

## Endpoints

### GET /category

Fetches all categories.

#### Response

- 200 OK: Returns an array of categories.

### POST /category

Creates a new category.

#### Request

- Body: `{ "name": "Category Name" }`

#### Response

- 200 OK: Returns a message indicating the category was created.

### GET /category/:id

Fetches a specific category.

#### Parameters

- `id`: The ID of the category to fetch.

#### Response

- 200 OK: Returns the requested category.
- 404 Not Found: If no category with the specified ID exists.

### PUT /category/:id

Updates a specific category.

#### Parameters

- `id`: The ID of the category to update.

#### Request

- Body: `{ "name": "New Category Name" }`

#### Response

- 200 OK: Returns a message indicating the category was updated.
- 404 Not Found: If no category with the specified ID exists.

# Reports API

## Endpoints

### GET /reports

Fetches all reports.

#### Response

- 200 OK: Returns an array of reports.

### POST /reports

Creates a new report.

#### Request

- Body: `{ "title": "Report Title", "description": "Report Description" }`

#### Response

- 200 OK: Returns a message indicating the report was created.

### GET /reports/:id

Fetches a specific report.

#### Parameters

- `id`: The ID of the report to fetch.

#### Response

- 200 OK: Returns the requested report.
- 404 Not Found: If no report with the specified ID exists.

### PUT /reports/:id

Updates a specific report.

#### Parameters

- `id`: The ID of the report to update.

#### Request

- Body: `{ "title": "New Report Title", "description": "New Report Description" }`

#### Response

- 200 OK: Returns a message indicating the report was updated.
- 404 Not Found: If no report with the specified ID exists.