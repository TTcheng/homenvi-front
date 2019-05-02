import SqlHelper from "../utils/SqlHelper";
import Pair from "../model/pair";

test('test simple select', () => {
  const sql = new SqlHelper().select().from("collections").build();
  expect(sql).toEqual('SELECT * FROM collections');
});

test('test select', () => {
  const sql = new SqlHelper()
    .select()
    .from("collections")
    .where(['name=jesse','time>now()-1h'])
    .groupBy(['gender'])
    .orderBy([new Pair('name', 'asc'), new Pair('id', 'asc')])
    .limit(5, 10)
    .build();
  expect(sql).toEqual('SELECT * FROM collections WHERE 1=1 AND name=jesse AND time>now()-1h GROUP BY gender ORDER BY name ASC,id ASC LIMIT 5,10');
});
