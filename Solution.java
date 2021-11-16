
import java.util.LinkedList;

public class Solution {

    int width;
    int height;
    int[][] moves = {
        {-1, 0},//up.
        {1, 0},//down.
        {0, -1},//left.
        {0, 1},//right.
        {-1, -1},//up, left.
        {1, -1},//down, left.
        {1, 1},//down, right.
        {-1, 1}//up, right.
    };

    public int shortestPathBinaryMatrix(int[][] matrix) {
        height = matrix.length;
        width = matrix[0].length;
        return breadthFirstSearch(0, 0, matrix);
    }

    public int breadthFirstSearch(int startRow, int startColumn, int[][] matrix) {
        if (matrix[startRow][startColumn] == 1) {
            return -1;
        }

        LinkedList<Point> queue = new LinkedList<>();
        queue.add(new Point(startRow, startColumn));

        int stepsToGoal = 0;
        matrix[startRow][startColumn] = 1;
        int sizeMoves = moves.length;

        while (!queue.isEmpty()) {
            stepsToGoal++;
            int stepsInCurrentMove = queue.size();

            while (stepsInCurrentMove-- > 0) {
                Point point = queue.removeFirst();
                int r = point.row;
                int c = point.column;

                if (r == height - 1 && c == width - 1) {
                    return stepsToGoal;
                }

                for (int i = 0; i < sizeMoves; i++) {
                    int new_r = r + moves[i][0];
                    int new_c = c + moves[i][1];
                    if (isInMatrix(new_r, new_c) && matrix[new_r][new_c] == 0) {
                        queue.add(new Point(new_r, new_c));
                        matrix[new_r][new_c] = 1;
                    }
                }
            }

        }
        return -1;
    }

    public boolean isInMatrix(int row, int column) {
        return row >= 0 && row < height && column >= 0 && column < width;
    }
}

class Point {

    int row;
    int column;

    public Point(int row, int column) {
        this.row = row;
        this.column = column;
    }
}
