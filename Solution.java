
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private static record Point(int row, int column) {}
    private static final int[][] MOVES = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}, {1, 1}, {-1, -1}, {1, -1}, {-1, 1}};
    private static final int THERE_IS_NO_PATH = -1;
    private static final int OBSTACLE = 1;
    private static final int EMPTY_POINT = 0;
    int rows;
    int columns;

    public int shortestPathBinaryMatrix(int[][] grid) {
        rows = grid.length;
        columns = grid[0].length;
        return breadthFirstSearch(grid);
    }

    private int breadthFirstSearch(int[][] grid) {
        if (grid[0][0] == OBSTACLE || grid[rows - 1][columns - 1] == OBSTACLE) {
            return THERE_IS_NO_PATH;
        }
        Queue<Point> queue = new LinkedList<>();
        queue.add(new Point(0, 0));
        grid[0][0] = OBSTACLE;
        int distance = 1;

        while (!queue.isEmpty()) {
            for (int i = queue.size() - 1; i >= 0; --i) {

                Point point = queue.poll();
                if (point.row == rows - 1 && point.column == columns - 1) {
                    return distance;
                }

                for (int[] move : MOVES) {
                    int row = point.row + move[0];
                    int column = point.column + move[1];

                    if (pointIsInGrid(row, column) && grid[row][column] == EMPTY_POINT) {
                        grid[row][column] = OBSTACLE;
                        queue.add(new Point(row, column));
                    }
                }
            }
            ++distance;
        }
        return THERE_IS_NO_PATH;
    }

    private boolean pointIsInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
