// 自定义列表
class List {
    constructor(items) {
        if (!items) {
            this.dataSource = [];
            this.listSize = 0;
            return;
        }
        if (items instanceof List) {
            this.dataSource = items.dataSource;
            this.listSize = items.listSize;
            return;
        }
        if (items instanceof Array) {
            this.dataSource = items;
            this.listSize = items.length; // 列表的大小
            return;
        }
        throw Error('Constructor param must be a Array or List')
    }

    static emptyList() {
        return new List();
    }

    /**
     * 在列表的末尾添加新元素
     * @param {*} element 要添加的元素
     */
    append(element) {
        this.dataSource[this.listSize++] = element;
    }

    /**
     * 在列表的末尾添加多个元素
     * @param {*} arr 要添加的元素数组
     */
    appendAll(arr) {
        if (arr instanceof Array) {
            arr.forEach((value) => {
                this.dataSource[this.listSize++] = value;
            });
            return;
        }
        throw Error('Argument must be array');
    }

    /**
     * 在列表中插入一个元素
     * @param {*} index 插入的位置，从零开始
     * @param {*} element 插入的元素
     */
    insert(index, element) {
        if (index < 0 || index >= this.listSize) {
            throw Error('Index out of range')
        }
        for (let i = this.listSize; i > index; i--) {
            this.dataSource[i] = this.dataSource[i - 1]
        }
        this.dataSource[index] = element;
        this.listSize++;
    }

    insertFirst(element) {
        for (let i = this.listSize; i > 0; i--) {
            this.dataSource[i] = this.dataSource[i - 1]
        }
        this.dataSource[0] = element;
        this.listSize++;
    }

    /**
     * 在列表中移除一个元素
     * @param {*} element 要删除的元素
     */
    remove(element) {
        if (!element) {
            return;
        }
        const index = this.dataSource.indexOf(element);
        if (index >= 0) {
            this.dataSource.splice(index, 1);
            this.listSize--;
            return;
        }
        throw Error(" no such a element!");
    }

    /**
     * 在列表中移除指定位置的元素
     * @param {*} index 要删除的元素的位置
     */
    removeOf(index) {
        if (index < 0 || index >= this.listSize) {
            throw Error('Index out of range')
        }
        this.dataSource.splice(index, 1);
        this.listSize--;
    }

    /**
     * 判断给定的值是否在列表中
     */
    contains(element) {
        return this.dataSource.indexOf(element) > -1;
    }

    /**
     * 获取第一个元素
     */
    getFirst() {
        return this.dataSource[0];
    }

    /**
     * 获取最后一个元素
     */
    getLast() {
        return this.dataSource[this.listSize - 1]
    }

    /**
     * 返回指定位置的元素
     */
    get(index) {
        return this.dataSource[index];
    }

    /**
     * 返回元素的位置
     */
    indexOf(elem) {
        return this.dataSource.indexOf(elem);
    }

    isEmpty(){
        return this.listSize === 0;
    }

    /**
     * 清楚列表中的元素
     */
    clear() {
        delete this.dataSource;
        this.dataSource = [];
        this.listSize = 0;
    }

    /**
     * 列表的长度
     */
    length() {
        return this.listSize;
    }

    toArray() {
        return this.dataSource;
    }

    /**
     * 显示当前列表的元素
     */
    toString() {
        return this.dataSource;
    }
}

export default List;