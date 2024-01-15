# Requirements
- mariadb database, for creating the user and tables, this project ships files under the`sql` directory.

# Installation
Clone the project
```sh
git clone https://github.com/LordTlasT/repport
cd repport
```
Install all dependencies
```sh
npm install
```
Also create a config.json file:
```json
{
    "host": "localhost",
    "user": "node",
    "password": "space123",
    "database": "nodedb",
    "token": "token123"
}
```
You can and should tweak these values to your liking.

# Running
```sh
npm run start
```
# Authorization
To use certain routes you need to pass the the Authorization header.  For example if your token in `config.json` is "token123" a curl request would look like this:
```sh
curl -X PUT http://localhost:3000/report/3 \
    -H "Content-Type: application/json" \
    -H 'Authorization: Bearer token123' \
    -d '{"title":"est", "category_id": "1", "token": "token123"}'
```

# Category API

## GET /category

Fetches all categories.

**Response**

A JSON array of categories.


## POST /category

Creates a new category.

**Request Body**

- `name`: The name of the category.

**Response**

A JSON object with a success message.


## GET /category/:id

Fetches a specific category by its ID.

**URL Parameters**

- `id`: The ID of the category.

**Response**

A JSON object representing the category.


## PUT /category/:id

Updates a specific category by its ID.

**URL Parameters**

- `id`: The ID of the category.

**Request Body**

- `name`: The new name of the category.

**Response**

A JSON object with a success message.


## GET /category/:id/reports

Fetches all reports in a specific category by its ID.

**URL Parameters**

- `id`: The ID of the category.

**Response**

A JSON array of reports in the category.

# Reports API

## GET /report

Fetches all reports.

**Response**

A JSON array of reports.

Example:

```json
[
    {
        "id": 1,
        "title": "Report 1",
        "description": "This is report 1",
        "category_id": 1
    },
    {
        "id": 2,
        "title": "Report 2",
        "description": "This is report 2",
        "category_id": 2
    }
]
```


## POST /report

Creates a new report.

**Request Body**

- `title`: The title of the report.
- `description`: The description of the report.
- `category_id`: The ID of the category the report belongs to.

**Response**

A JSON object with a success message.

Example:

```json
{
    "message": "Report created"
}
```

## GET /report/:id

Retrieves details of a specific report.

### Parameters

- **id** (integer): The ID of the report to be retrieved.

### Response

- **Status Code**: 200 OK
- **Body**:

```json
{
    "id": 1,
    "title": "Report 1",
    "description": "This is report 1",
    "category_id": 1
}
```


## PUT /report/:id

Updates a specific report.

### Parameters

- **id** (integer): The ID of the report to be updated.

### Request Body

- **Content Type**: application/json

```json
{
    "title": "Updated Report Title",
    "description": "Updated report description",
    "category_id": 1
}
```
Note: description is optional.


## DELETE /report/:id

Deletes a specific report.

### Parameters

- **id** (integer): The ID of the report to be deleted.

### Response

- **Status Code**: 200 OK
- **Body**:

```json
{
    "message": "Report deleted"
}
```