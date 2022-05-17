
#include <array>
#include <queue>
#include <vector>
using namespace std;

class Solution {

    struct Point {
        int row{};
        int column{};
        Point(int row, int column) : row{row}, column{column}{}
        Point() = default;
        virtual ~Point() = default;
    };
    
    inline static const array<array<int, 2>, 8> MOVES{ {{-1, 0}, {1, 0}, {0, -1}, {0, 1}, {1, 1}, {-1, -1}, {1, -1}, {-1, 1}} };     
    inline static const int THERE_IS_NO_PATH = -1;
    inline static const int OBSTACLE = 1;
    inline static const int EMPTY_POINT = 0;
    size_t rows;
    size_t columns;

public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        rows = grid.size();
        columns = grid[0].size();
        return breadthFirstSearch(grid);
    }

private:
    int breadthFirstSearch(vector<vector<int>>& grid) {
        if (grid[0][0] == OBSTACLE || grid[rows - 1][columns - 1] == OBSTACLE) {
            return THERE_IS_NO_PATH;
        }
        queue<Point> queue;
        queue.push(Point(0, 0));
        grid[0][0] = OBSTACLE;
        int distance = 1;

        while (!queue.empty()) {
            for (int i = queue.size() - 1; i >= 0; --i) {

                Point point = queue.front();
                queue.pop();
                if (point.row == rows - 1 && point.column == columns - 1) {
                    return distance;
                }

                for (const auto& move : MOVES) {
                    int row = point.row + move[0];
                    int column = point.column + move[1];

                    if (pointIsInGrid(row, column) && grid[row][column] == EMPTY_POINT) {
                        grid[row][column] = OBSTACLE;
                        queue.push(Point(row, column));
                    }
                }
            }
            ++distance;
        }
        return THERE_IS_NO_PATH;
    }

    bool pointIsInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
};
