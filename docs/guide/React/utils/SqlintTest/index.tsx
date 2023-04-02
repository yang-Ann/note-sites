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
      <Text style={{ textAlign: "center", fontSize: 24 }}>数据库测试</Text>
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
            mhelper.insert(["张三", 18]).then(res => {
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
            mhelper.inserts([
              ["啦啦啦啦啦绿绿", 18, 1, 2.3, "说明", 123, 12313, 12312],
              ["小李", 22],
              ["小明", 11],
              ["小张", 18],
              ["小王", 21]
            ]).then(res => {
              console.log("res: ", res);
            }).catch(err => {
              console.log("err: ", err);
            });
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
            mhelper.getByCustom(["name", "id"], ["李四", 1], "OR").then(res => {
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
            mhelper.updateById(6, ["李四", 22]).then(res => {
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
        title="删除 name=小王 AND age=21 的数据"
        onPress={() => {
          if (mhelper instanceof SqlintHelper) {
            mhelper.deleteByCustom(["name", "age"], ["小王", 21], "AND").then(res => {
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
