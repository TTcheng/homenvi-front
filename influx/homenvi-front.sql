-- influxdb sql scripts
-- @date 04.23.2019
-- @author wangchuncheng
CREATE USER "homenvi-front" WITH PASSWORD 'xxxx';
GRANT READ ON homenvi TO "homenvi-front";

-- verify
-- shell: influx -username homenvi-front -password xxxx
USE homenvi;
SELECT * FROM collections LIMIT 1;