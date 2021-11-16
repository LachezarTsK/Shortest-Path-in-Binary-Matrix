
const moves = [
    [-1, 0], //up.
    [1, 0], //down.
    [0, -1], //left.
    [0, 1], //right.
    [-1, -1], //up, left.
    [1, -1], //down, left.
    [1, 1], //down, right.
    [-1, 1]//up, right.
];

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var shortestPathBinaryMatrix = function (matrix) {
    let height = matrix.length;
    let width = matrix[0].length;
    return breadthFirstSearch(0, 0, matrix, height, width);
};

/**
 * @param {number} startRow
 * @param {number} startColumn 
 * @param {number[][]} matrix
 * @param {number} height
 * @param {number} width 
 * @return {number}
 */
function breadthFirstSearch(startRow, startColumn, matrix, height, width) {
    if (matrix[startRow][startColumn] === 1) {
        return -1;
    }

    let queue = new LinkedList();
    queue.addToTail([startRow, startColumn]);

    let stepsToGoal = 0;
    matrix[startRow][startColumn] = 1;
    let sizeMoves = moves.length;

    while (queue.size > 0) {
        stepsToGoal++;
        let stepsInCurrentMove = queue.size;

        while (stepsInCurrentMove-- > 0) {
            let node = queue.removeFirst();
            let r = node.coordinates[0];
            let c = node.coordinates[1];

            if (r === height - 1 && c === width - 1) {
                return stepsToGoal;
            }

            for (let i = 0; i < sizeMoves; i++) {
                let new_r = r + moves[i][0];
                let new_c = c + moves[i][1];
                if (isInMatrix(new_r, new_c, width, height) && matrix[new_r][new_c] === 0) {
                    queue.addToTail([new_r, new_c]);
                    matrix[new_r][new_c] = 1;
                }
            }
        }
    }
    return -1;
}

/**
 * @param {numberow} row
 * @param {number} column 
 * @param {number} height
 * @param {number} width 
 * @return {boolean}
 */
function isInMatrix(row, column, height, width) {
    return row >= 0 && row < height && column >= 0 && column < width;

}

/**
 * @param {number[]} coordinates
 * @param {ListNode} next
 */
function ListNode(coordinates, next) {
    this.coordinates = (coordinates === undefined ? 0 : coordinates);
    this.next = (next === undefined ? null : next);
}

class LinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    addToTail(coordinates) {

        this.size++;
        if (this.head === null) {
            this.head = new ListNode(coordinates);
            this.tail = this.head;
        } else {
            this.temp.next = new ListNode(coordinates);
            this.tail = this.temp.next;
        }
    }

    removeFirst() {

        this.size--;
        let temp = this.head;
        if (this.head.next === null) {
            this.head = null;
            this.tail = this.head;
        } else {
            this.head = this.head.next;
        }
        return temp;
    }
}
