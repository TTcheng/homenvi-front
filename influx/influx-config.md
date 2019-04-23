# influxDB config

## 1.create user
```sql
CREATE USER "homenvi-front" WITH PASSWORD 'xxxx';
GRANT READ ON homenvi TO "homenvi-front";
```

## 2.verify
- login
```shell
influx -username homenvi-front -password xxxx
```
- verify query
```sql
USE homenvi;
SELECT * FROM collections LIMIT 1;
```

## 3.add to server
````shell
curl -H "Authorization: Bearer 18467d75-bdbb-43c2-b5f6-c1b102f733f2" -H "Content-Type: application/json" -X POST 'http://localhost/api/homenvi/influxusers' --data '{"username":"homenvi-front","password":"xxxx"}'
````
