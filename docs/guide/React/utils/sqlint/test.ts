// https://www.runoob.com/sqlite/sqlite-syntax.html

import { openDatabase, enablePromise } from "react-native-sqlite-storage";
import type { SQLiteDatabase, ResultSet } from "react-native-sqlite-storage";

// 开启 promise
enablePromise(true);

const tableName = "test.db";

// 获取连接
export const getDBConnect = (name = tableName) => {
  return openDatabase({
    name,
    location: "default"
    // createFromLocation: "~/www/mlkj" // 指定数据的位置
  });
};

// 创建数据库
export const createTable = (db: SQLiteDatabase, name = tableName) => {
  const sql = `CREATE TABLE IF NOT EXISTS "${name}" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    age2 LONG,
    age3 FLOAT,
    info VARCHAR);`;
  return db.executeSql(sql);
};

export const getList = (db: SQLiteDatabase, name = tableName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const results = await db.executeSql(`SELECT * FROM "${name}"`);
      const list = bulidRet(results);
      resolve(list);
    } catch (error) {
      reject(error);
    }
  });
};

export const getById = (db: SQLiteDatabase, name = tableName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const results = await db.executeSql(`SELECT * FROM "${name}" WHERE id=?`, [1]);
      const list = bulidRet(results);
      // 只要第1条
      const data = list.length > 0 ? list[0] : list;
      if (list.length > 1) console.warn("获取到多条数据: ", list);
      resolve(data.length === 0 ? null : data);
    } catch (error) {
      reject(error);
    }
  });
};

// 插入数据
export const insert = (db: SQLiteDatabase) => {
  return new Promise(async (resolve, reject) => {
    try {
      // 插入或者替换
      const insertQuery = `INSERT or REPLACE INTO "${tableName}" (name, age) VALUES(?, ?)`;
      const [res] = await db.executeSql(insertQuery, ["张三", 18]);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateById = (db: SQLiteDatabase) => {
  const insertQuery = `UPDATE "${tableName}" SET name=? WHERE id=?`;
  return db.executeSql(insertQuery, ["李四", 1]);
};

export const deleteById = (db: SQLiteDatabase) => {
  const deleteQuery = `DELETE from "${tableName}" WHERE id=?`;
  return db.executeSql(deleteQuery, [1]);
};

// 清空表数据
export const truncate = (db: SQLiteDatabase) => {
  const query = `DELETE from "${tableName}" WHERE 1=1`;
  return db.executeSql(query);
};

// 删除表
export const deleteTable = (db: SQLiteDatabase) => {
  const query = `DROP table "${tableName}"`;
  return db.executeSql(query);
};

// 根据名称获取(事务操作)
export const getByName = (db: SQLiteDatabase) => {
  return new Promise(async (resolve, reject) => {
    const list: any[] = [];
    // 开启一个事务
    db.transaction(
      async tx => {
        // 这里可以执行多个sql操作
        tx.executeSql(
          `SELECT * FROM "${tableName}" WHERE name=?`,
          ["张三"],
          (tx, results) => {
            for (let i = 0; i < results.rows.length; i++) {
              const row = results.rows.item(i);
              list.push(row);
            }
          },
          // sql 查询失败
          error => {
            reject(error);
          }
        );
      },
      // 事务操作失败
      error => {
        reject(error);
      },
      // 事务操作成功
      () => {
        resolve(list);
      }
    );
  });
};

// 解析 sql 查询返回值
const bulidRet = (results: [ResultSet]) => {
  const list: any[] = [];
  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      list.push(result.rows.item(i));
    }
  });
  return list;
};
