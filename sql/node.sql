DROP USER IF EXISTS 'node'@'%';
CREATE USER 'node'@'%' IDENTIFIED BY 'space123';
GRANT ALL PRIVILEGES ON `nodedb`.* TO 'node'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- From sql secure installation -----------------------------------------------
-- Remove anonymous user
DELETE FROM mysql.global_priv WHERE User='';
-- Disable root remote login
DELETE FROM mysql.global_priv
WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
-- Don't create default 'test' schema
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%'
-- TODO: Reload changes
-- FLUSH PRIVILEGES;
