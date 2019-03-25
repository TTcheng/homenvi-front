import List from './List'


test('list constructor with illegal args', () => {
    expect(new List("hello")).toThrow('Constructor param must be a Array or undefined');
});

test('list append', () => {
    let list = new List();
    list.append(1);
    list.append(2);
    let target = new List([1, 2]);
    console.log("receive", list);
    console.log("expect", target);
    expect(list).toEqual(target);
});

test('list appendAll', () => {
    let list = new List([1, 2]);
    list.appendAll([3, 4, 5]);
    expect(list).toEqual(new List([1, 2, 3, 4, 5]));
    expect(list.length()).toEqual(5);
});

test('list remove', () => {
    let list = new List([1, 2]);
    list.remove(1);
    expect(list).toEqual(new List([2]));
});

test('list removeOf', () => {
    let list = new List([1, 2]);
    list.removeOf(0);
    expect(list).toEqual(new List([2]));
});


test('list insert', () => {
    let list = new List([1, 2]);
    list.insert(1, 3);
    expect(list).toEqual(new List([1, 3, 2]));
});

test('list insert first', () => {
    let list = new List([1, 2]);
    list.insertFirst(3);
    expect(list).toEqual(new List([3, 1, 2]));
});

test('list emptyList', () => {
    let list = List.emptyList();
    expect(list).toEqual(new List());
    expect(list.isEmpty()).toBeTruthy();
});

test('list contains', () => {
    let arr = [1, 2, 3];
    let list = new List(arr);
    arr.forEach(value => {
        expect(list.contains(value)).toBeTruthy();
    })
});

test('list get', () => {
    let list = new List([1, 2, 3]);
    expect(list.getFirst()).toEqual(1);
    expect(list.get(1)).toEqual(2);
    expect(list.getLast()).toEqual(3);

});


test('list indexOf', () => {
    let arr = [1, 2, 3];
    let list = new List(arr);
    arr.forEach((value, index) => {
        expect(list.indexOf(value)).toEqual(index);
    })
});

test('list clear', () => {
    let list = new List([1, 2, 3]);
    list.clear();
    expect(list).toEqual(List.emptyList());
    expect(list).toBeInstanceOf(List);
});

test('list toArray length', () => {
    let arr = [1, 2, 3];
    let list = new List(arr);
    expect(list.toArray()).toEqual(arr);
    expect(list.length()).toEqual(arr.length);
});
