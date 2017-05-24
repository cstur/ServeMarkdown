## npm
```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org

# for dx test env
npm i sqlite3 --registry http://r.cnpmjs.org/

yarn config set registry http://r.cnpmjs.org/
```

## linux
```sh

netstat -tulpn

systemctl start docker
systemctl status docker
systemctl enable docker

cat /proc/version

# centos
lsb_release -a
firewall-cmd --zone=public --add-port=22/tcp --permanent

```

## redis
```sh
# linux
systemctl start redis.service

# mac
brew services start redis
redis-server /usr/local/etc/redis.conf --daemonize yes

```

## shadow
```sh
/usr/bin/ssserver -p 8399 -k password -m rc4 -d start
```

## docker
```sh
docker exec -it f0b1746cdc1b /bin/bash

#elk
sysctl -w vm.max_map_count=262144

```

## ssh
```sh
ssh-copy-id user@123.45.56.78
```

## android
```sh
adb logcat > logcat.txt
```

## mongo
```js
use admin
db.createUser(
  {
    user: "stur",
    pwd: "pass",
    roles: [ { role: "readWrite", db: "pencilblue" } ]
  }
)
```
```sh
# mac
mongod --fork --logpath ~/mongolog --dbpath ~/mongodb
```

## git
git remote add origin git@github.com:cstur/aaa.git

