# **Database Schema**

## `Users`

| column name | data type | details                   |
|-------------|-----------|---------------------------|
| id          | integer   | not null, primary key     |
| firstName   | string (20)   | not null                 |
| lastName   | string (20)   | not null                 |
| email       | string (50)   | not null, indexed, unique |
| buyingPower | float     | not null
| created_at  | datetime  | not null                  |
| updated_at  | datetime  | not null                  |

* `id` references `Transaction` table
* `id` references `watchList` table

## `Transactions`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| stockId     | integer   | not null, foreign key              |
| userId      | integer   | not null, foreign key |
| quantity    | float     | not null
| pricePurchased | float  |
| priceSold   | float     |
| purchased   | boolean   | not null
| created_at  | datetime  | not null              |
| updated_at  | datetime  | not null              |

* `stockId` references `Stock` table

## `Stocks`

| column name   | data type | details               |
|---------------|-----------|-----------------------|
| id            | integer   | not null, primary key |
| name       | string (50)   | not null              |
| symbol        | string (10) | not null            |
| stockHistoryId  | integer | not null, foreign key      |
| description   | string    |
| marketCap     | float     | not null              |
| peRatio       | float     | not null              |
| dividend      | float     |
| stockCEO      | string (40) |
| employees     | integer   |
| headquarters  | string    |
| yearFounded   | integer   |
| created_at    | datetime  | not null              |
| updated_at    | datetime  | not null              |

* `stockHistoryId` references `StockHistory` table

## `StockHistory`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| stockId        | integer   | not null |
| price         | float     | not null
| timeStamp     | datetime      | not null
| created_at   | datetime   | not null         |
| updated_at | datetime   | not null           |

## `WatchListItem`

| column name   | data type | details                   |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key     |
| watchListId   | integer   | not null, foreign key      |
| stockId       | integer   | not null, foreign key     |
| created_at   | datetime   | not null         |
| updated_at | datetime   | not null           |

* `watchListId` references `WatchList` table
* `stockId` references `Stock` table

## `WatchList`

| column name   | data type | details                   |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key     |
| name          | string (50) | not null
| userId   | integer   | not null, foreign key      |
| created_at   | datetime   | not null         |
| updated_at | datetime   | not null           |

* `userId` references `Users` table
