import { openDatabase, enablePromise } from "react-native-sqlite-storage";
import type { DatabaseParams, SQLiteDatabase, ResultSet } from "react-native-sqlite-storage";

// 数据类型
export type DataType = "INTEGER" | "LONG" | "FLOAT" | "VARCHAR" | "TEXT";

// 表字段配置
export type TableFieldsOption = {
  field: string; // 字段名
  type: DataType; // 数据类型
  isKey?: boolean; // 是否是主键
  isNotNull?: boolean; // 不能为空
};

export type WhereType = "AND" | "OR";

// TODO 待添加
// ORDER BY
// LIMIT
// LIKE
// 事务操作

// 开启 Promise 返回值操作
enablePromise(true);

// sqlint 操作类
class SqlintHelper {
  public db: SQLiteDatabase | null = null; // sql连接对象, 通过 SqlintHelper.getDBConnect() 获取
  public constructor(
    public databaseParams: DatabaseParams,
    public fieldsOption: TableFieldsOption[], // 表格字段配置, 特意写成数组(写成对象顺序, for...in 无法保证顺序)
    public queryFields = "*", // 默认查询的字段
  ) {
    // 需要实例首先调用, 因为涉及到异步操作(构造函数不支持异步)
    // this.init().then(res => console.log("初始化成功")).catch(err => console.log("初始化失败: ", err));
  }

  public async init(): Promise<SqlintHelper | Error> {
    return new Promise(async (resolve, reject) => {
      try {
        // 打开数据库连接
        this.db = await openDatabase(this.databaseParams);
        console.log(`${this.databaseParams.name} 打开成功: `, this.db);
        await this.createTable();
        resolve(this);
      } catch (error) {
        if (error instanceof Error) {
          reject(error.message);
        } else {
          console.log("error: ", error);
          reject("数据库连接失败了");
        }
      }
    });
  }

  // 表名
  get tableName() {
    return this.databaseParams.name;
  }

  // 创建数据库
  public createTable() {
    const sql = this.buildCreateSql();
    return this.executeSql(sql);
  }

  // 构建创建表 sql
  public buildCreateSql() {
    const list: string[] = [];

    this.fieldsOption.forEach(e => {
      const { field, type, isKey, isNotNull } = e;
      const line = `${field} ${type} ${isKey ? "PRIMARY KEY AUTOINCREMENT" : ""} ${isNotNull ? "NOT NULL" : ""}`;
      list.push(line);
    });

    const sql = `CREATE TABLE IF NOT EXISTS "${this.tableName}" (${list.join(", ")});`;
    return sql;
  }

  // 获取主键的字段名
  public getFieldKey() {
    const target = this.fieldsOption.find(e => e.isKey);
    if (target) {
      return target.field;
    } else {
      throw new Error(`没有获取到主键, 请检查 fieldsOption 配置: ${this.fieldsOption}`);
    }
  }

  // 获取所有的字段信息, 会自动拼接 字段和对应的值填充语句
  public getFields() {
    // 要把自增的主键剔除
    return this.fieldsOption.filter(e => !e.isKey).map(e => e.field);
  }

  // 数据字段对齐填充位(就是表有5个字段, 数据只给了2个字段, 剩下的补上 undefined)
  public alignFill(data: any[]) {
    let ret = JSON.parse(JSON.stringify(data));
    // 所有的字段
    const fields = this.getFields();
    // 填充位不对
    const fieldsLen = fields.length;

    // 太短填充 undefined 至对齐填充位
    if (fieldsLen > ret.length) {
      const fill = Array.from({ length: fieldsLen - ret.length }).map(() => undefined);
      ret.push(...fill);

      // 太长只截取到字段长度
    } else if (fieldsLen < ret.length) {
      ret = ret.slice(0, fieldsLen)
    }
    return ret;
  }

  // 关闭数据库
  public close() {
    return this.db?.close();
  }

  // 解析 sql 查询返回值为数组
  public bulidRet(results: [ResultSet]) {
    const list: any[] = [];
    results.forEach(result => {
      for (let i = 0; i < result.rows.length; i++) {
        list.push(result.rows.item(i));
      }
    });
    return list;
  }

  // 包装一下 executeSql 方法
  // public executeSql(...args: Parameters<typeof this.db.executeSql>) { // TODO 获取的是重载的类型
  public executeSql(statement: string, params?: any[]) {
    // 输出日志, 方便调试
    console.group("executeSql");
    console.log("sql: ", statement);
    console.log("params: ", params);
    console.groupEnd();

    if (this.db) {
      return this.db.executeSql(statement, params);
    } else {
      throw new Error("还没有初始化数据库连接, 请先执行 init 方法");
    }
  }

  // 获取所有的数据
  public getList(queryFields = this.queryFields) {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await this.executeSql(`SELECT ${queryFields} FROM "${this.tableName}"`);
        const list = this.bulidRet(results);
        resolve(list);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 根据主键进行获取
  public getById(id: any, queryFields = this.queryFields) {
    return new Promise(async (resolve, reject) => {
      try {
        const key = this.getFieldKey();
        const results = await this.executeSql(`SELECT ${queryFields} FROM "${this.tableName}" WHERE ${key}=?`, [id]);
        const list = this.bulidRet(results);

        // 只要第1条
        const data = list.length > 0 ? list[0] : list;
        if (list.length > 1) console.warn("获取到多条数据: ", list);
        resolve(data.length === 0 ? null : data);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 查询数据(自定义字段和数据)
  public getByCustom(fields: string[], data: any[], flog: WhereType = "AND", queryFields = this.queryFields) {
    return new Promise(async (resolve, reject) => {
      try {
        // 值填充符
        const whereSql = fields.map(e => `${e}=?`).join(` ${flog} `);
        const sql = `SELECT ${queryFields} FROM "${this.tableName}" WHERE ${whereSql}`;
        const results = await this.executeSql(sql, data);
        const list = this.bulidRet(results);
        resolve(list);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 插入单条数据
  public insert(data: any[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const fields = this.getFields();
        // 所有的字段
        const fieldsStr = fields.join(", ");
        // 值填充符
        const fillStr = fields.map(() => "?").join(", ");
        // INSERT or REPLACE 表示插入或替换
        const sql = `INSERT or REPLACE INTO "${this.tableName}" (${fieldsStr}) VALUES(${fillStr})`;
        const [res] = await this.executeSql(sql, data);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 插入多条数据
  public inserts(data: any[][]) {
    return new Promise(async (resolve, reject) => {
      try {
        const fields = this.getFields();
        // 所有的数据
        const allData: any = [];
        // 所有的字段
        const fieldsStr = fields.join(", ");
        const item = data.shift();
        let first;
        if (item) {
          // 对齐填充位
          const alignData = this.alignFill(item);
          allData.push(...alignData);
          first = alignData.map(() => "?").join(", ");
        }
        const other = data.flatMap(e => {
          // 对齐填充位
          const alignData = this.alignFill(e);
          allData.push(...alignData);
          const line = alignData.map(() => "?").join(", ");
          return `(${line})`;
        }).join(", ");
        // INSERT or REPLACE 表示插入或替换
        const sql = `INSERT or REPLACE INTO "${this.tableName}" (${fieldsStr}) VALUES(${first}), ${other}`;
        const [res] = await this.executeSql(sql, allData);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 根据主键更新数据
  public updateById(where: any, data: any[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const fields = this.getFields();
        const setSql = fields.map(e => `${e}=?`).join(", ");
        const key = this.getFieldKey();
        const sql = `UPDATE "${this.tableName}" SET ${setSql} WHERE ${key}=?`;
        // 对齐填充位
        const alignData = this.alignFill(data);
        // 将主键值添加到最后, 对应 where 条件(前提是要先把没有给的数据字段先填充好)
        alignData.push(where);

        const [res] = await this.executeSql(sql, alignData);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 根据主键删除数据
  public deleteById(id: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const key = this.getFieldKey();
        const sql = `DELETE from "${this.tableName}" WHERE ${key}=?`;
        const [res] = await this.executeSql(sql, [id]);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 删除数据(根据自定义字段)
  public deleteByCustom(fields: string[], data: any[], flog: WhereType = "AND") {
    return new Promise(async (resolve, reject) => {
      try {
        // 值填充符
        const whereSql = fields.map(e => `${e}=?`).join(` ${flog} `);
        const sql = `DELETE from "${this.tableName}" WHERE ${whereSql}`;
        const [res] = await this.executeSql(sql, data);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 请空表数据
  public clearTale() {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `DELETE from "${this.tableName}" WHERE 1=1`;
        const [res] = await this.executeSql(sql);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 删除表
  public deleteTable() {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `DROP table "${this.tableName}"`;
        const [res] = await this.executeSql(sql);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  // TODO 事务操作
  // public transactionQuery() {
  //   return new Promise(async (resolve, reject) => {
  //     const list: any[] = [];
  //     // 开启一个事务
  //     this.db.transaction(
  //       async tx => {
  //         // 这里可以执行多个sql操作
  //         tx.executeSql(
  //           `SELECT * FROM "${this.tableName}" WHERE id=?`,
  //           [1],
  //           (tx, results) => {
  //             for (let i = 0; i < results.rows.length; i++) {
  //               const row = results.rows.item(i);
  //               list.push(row);
  //             }
  //           },
  //           // sql 查询失败
  //           error => {
  //             reject(error);
  //           }
  //         );
  //       },
  //       // 事务操作失败
  //       error => {
  //         reject(error);
  //       },
  //       // 事务操作成功
  //       () => {
  //         resolve(list);
  //       }
  //     );
  //   });
  // }
}

export default SqlintHelper;
