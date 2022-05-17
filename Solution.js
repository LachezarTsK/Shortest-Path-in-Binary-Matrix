
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
    this.MOVES = [[-1, 0], [1, 0], [0, -1], [0, 1], [1, 1], [-1, -1], [1, -1], [-1, 1]];
    this.THERE_IS_NO_PATH = -1;
    this.OBSTACLE = 1;
    this.EMPTY_POINT = 0;
    this.rows = grid.length;
    this.columns = grid[0].length;
    return breadthFirstSearch(grid);
};

/**
 * @param {number} row
 * @param {number} column
 */
function Point(row, column) {
    this.row = row;
    this.column = column;
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
function breadthFirstSearch(grid) {
    if (grid[0][0] === this.OBSTACLE || grid[rows - 1][columns - 1] === this.OBSTACLE) {
        return this.THERE_IS_NO_PATH;
    }
    const queue = new Queue();
    queue.enqueue(new Point(0, 0));
    grid[0][0] = this.OBSTACLE;
    let distance = 1;

    while (!queue.isEmpty()) {
        for (let i = queue.size() - 1; i >= 0; --i) {

            const point = queue.dequeue();
            if (point.row === this.rows - 1 && point.column === this.columns - 1) {
                return distance;
            }

            for (let move of this.MOVES) {
                let row = point.row + move[0];
                let column = point.column + move[1];

                if (pointIsInGrid(row, column) && grid[row][column] === this.EMPTY_POINT) {
                    grid[row][column] = this.OBSTACLE;
                    queue.enqueue(new Point(row, column));
                }
            }
        }
        ++distance;
    }
    return this.THERE_IS_NO_PATH;
}

/**
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
function pointIsInGrid(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
}
