import { useEffect } from "react";
import { Text, View, Button } from "react-native";
import SqlintHelper from "../../sqlint/SqlintHelper";


let mhelper: SqlintHelper
const ScanCode = () => {
  useEffect(() => {
    if (!mhelper) {
      const instance = new SqlintHelper(
        {
          name: "test.db",
          location: "default"
        },
        [
          {
            field: "id",
            type: "INTEGER",
            isKey: true
          },
          { field: "name", type: "TEXT", isNotNull: true },
          { field: "age", type: "INTEGER", isNotNull: true },
          { field: "age2", type: "LONG" },
          { field: "age3", type: "FLOAT" },
          { field: "info", type: "VARCHAR" }
        ],
      );
      instance
        .init()
        .then(res => {
          if (res instanceof SqlintHelper) {
            mhelper = res;
          }
        })
        .catch(err => {
          console.log("数据库连接失败了", err);
        });
    }

    () => {
      if (mhelper) mhelper.close();
    };
  }, []);

  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 24 }}>封装数据库测试</Text>
      <Button
        title="创建数据库"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            mhelper.createTable().then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            })
          }
        }}
      />
      <Button
        title="插入数据"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            mhelper.insert({ name: "张三", age: 18 }).then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            })
          }
        }}
      />
      <Button
        title="插入多条数据"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            const datas = [
              { name: "小李", age: 22, info: "说明", age3: 3.14 },
              { name: "小明", age: 11 },
              { name: "小张", age: 18 },
              { name: "小王", age: 21, info: "ceeeee" },
            ]
            mhelper.inserts(datas).then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            })
          }
        }}
      />
      <Button
        title="获取所有的数据"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            mhelper.getList().then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            })
          }
        }}
      />
      <Button
        title="获取所有的数据(只显示部分字段)"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            mhelper.getList("name, age, id").then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            })
          }
        }}
      />
      <Button
        title="获取id=1的数据"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            mhelper.getById(1).then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            })
          }
        }}
      />
      <Button
        title="获取 name=李四 OR id=1 的数据"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            mhelper.getByCustom({ name: "李四", id: 1 }, "OR").then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            })
          }
        }}
      />
      <Button
        title="更新id=1的数据"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            mhelper.updateById({ id: 12, name: "李四", age: 22 }).then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            })
          }
        }}
      />
      <Button
        title="更新 id=12 AND name=张三 的数据"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            mhelper.updateByCustom({ age: 999, info: "abcde" }, {id: 12, name: "李四"}, "AND").then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            })
          }
        }}
      />
      <Button
        title="删除id=6的数据"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            mhelper.deleteById(6).then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            })
          }
        }}
      />
      <Button
        title="删除 age=22 AND name=小李 的数据"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            mhelper.deleteByCustom({ age: 22, name: "小李" }, "OR").then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            })
          }
        }}
      />
      <Button
        title="清空数据"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            mhelper.clearTale().then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            })
          }
        }}
      />
      <Button
        title="删除表"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            mhelper.deleteTable().then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            })
          }
        }}
      />
    </View>
  );
};

export default ScanCode;
