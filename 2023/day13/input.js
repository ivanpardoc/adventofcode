const input = [
  "######..#....#.",
  "######.#.#.####",
  "##..###.##.#..#",
  "......######.#.",
  "#....###...##.#",
  ".#..#.###.#.##.",
  ".#..#..##.#.##.",
  "",
  "#.#....##....#.#.",
  "#.#....##....#.#.",
  "##.##.####.##.###",
  ".....#....#......",
  "#####.####.######",
  ".###...##...###.#",
  "..####....####...",
  ".#####....#####.#",
  ".##...#..##..##..",
  "#.####....####.#.",
  ".#....####....#.#",
  "..##........##...",
  ".#.###....###.#.#",
  "",
  "#########..##",
  ".####..#.##.#",
  ".#..#....##..",
  "..##..#.#..#.",
  ".......#.##.#",
  ".####.#.#..#.",
  "..##...#....#",
  "......#..##..",
  "#...###..##..",
  "",
  "#..#..#.###",
  "###....####",
  "##..##.#.#.",
  "##..##.#.#.",
  "###....####",
  "#..#..#.###",
  "##.##..##.#",
  "#...#.....#",
  "...##.###.#",
  "####.#.##..",
  ".#.###.#...",
  "####..#...#",
  "#.#.#####..",
  "#.#.#####..",
  "####..#....",
  ".#.###.#...",
  "####.#.##..",
  "",
  "####....####.#...",
  "#.#.#..#.#.#.#...",
  "...#....#....#.##",
  ".#.#.####.#.###..",
  "#.##.##.##.##.#..",
  "####....#######..",
  ".##########.##...",
  "...##..##....####",
  "##...##...##.####",
  ".##########..####",
  ".#.##..##.#..#.##",
  ".#........#.#.###",
  ".##.####.##.#..##",
  "",
  "####..##..#####",
  "#.#..#..#..#.##",
  ".##..#..#..##..",
  ".#..#....#..#..",
  "..#.#.##.#.#...",
  "..#.#.##.#.#...",
  ".##..#..##.##..",
  "",
  "#....##....##..",
  "##..#..#..####.",
  "##........####.",
  "...##..##......",
  "###..##..######",
  "..##.##.##....#",
  "###..##..######",
  ".##########..##",
  "##..####..####.",
  "..###..###....#",
  "..########....#",
  "..#............",
  "#.#..##..#.##.#",
  "####....#######",
  "....####.......",
  "",
  "##.##.###########",
  "#..#..###.#..#.##",
  "##..#.##...##.#.#",
  "..##.###...##...#",
  "#.###.#..######..",
  "##.##...#.####.#.",
  "##.##...#.####.#.",
  "#.###.#..######..",
  "..##.###...##...#",
  "",
  "#..##..##..##",
  "#..##..#..##.",
  "#.#..#.#.##..",
  "#......##.##.",
  "#......##.##.",
  "#.#..#.#.##..",
  "#..##..#..#..",
  "#..##..##..##",
  ".#....#.#..#.",
  "",
  ".##..####.###.##.",
  "#..######.##...##",
  "#..#.##.#..##.#.#",
  "####...####.#..##",
  "####.#...##.####.",
  "#..#.#.#......##.",
  "#####.###.##..#.#",
  "#####.###.##..#.#",
  "#..#.#.#......##.",
  "####.#...##.####.",
  "####...####.#..##",
  "#..#.##.#..##.#.#",
  "#..######.##...##",
  ".##..####.###.##.",
  ".##.##.##..##.###",
  ".......#.#....#.#",
  "#...#....##..#...",
  "",
  ".##.#.##.",
  ".##.#.##.",
  "##.....##",
  "..###...#",
  "###.##.#.",
  ".#...##..",
  ".#...#...",
  "",
  "...#.....",
  "........#",
  "#..##..##",
  "###..###.",
  "###..###.",
  "#..##..##",
  "........#",
  "",
  "..####.....######",
  "#.####.######.##.",
  "###..####...#.##.",
  "..#..#..#.#######",
  "...##......######",
  "..#..#...#####..#",
  "#.####.####.#....",
  ".##..##..###..##.",
  "#########.##.###.",
  "##....##.########",
  "..#..#...#...####",
  "",
  "########..#.#",
  "....#.##...#.",
  ".##.....#..##",
  ".##....#.#.#.",
  "####.###.#.#.",
  "####..###.#..",
  "#..#.#.#...##",
  ".##..#.#.#..#",
  "#..#.##..##..",
  "#..#.#.#...#.",
  "#..#.##..#..#",
  "....##.....#.",
  "....####.###.",
  "....####.#.#.",
  "....##.....#.",
  "#..#.##..#..#",
  "#..#.#.#...#.",
  "",
  "#.##..##.###...",
  ".###..###.##.##",
  "###.##.###.#...",
  "#.#....#.####..",
  "#...##...###..#",
  "#...##...###...",
  "#.#....#.####..",
  "###.##.###.#...",
  ".###..###.##.##",
  "#.##..##.###...",
  "#.##..##.#.####",
  ".#.####.#.#....",
  "###....######.#",
  "",
  ".####.##.##",
  "#.#..#..#..",
  "#.#..#..#..",
  ".####.##.##",
  "...#.......",
  "##.#......#",
  ".##.######.",
  "",
  ".#..##...###..#",
  ".########..#.#.",
  "###.##....##.##",
  "...#####...##.#",
  ".#.#.#.#.#..##.",
  ".#.#.#.#.#..##.",
  "...#####...##.#",
  "###.##....##.##",
  ".########..#...",
  ".#..##...###..#",
  "..##..#...###.#",
  "..##..#...###.#",
  ".#..##...###..#",
  "",
  "...#.#.",
  "...#..#",
  ".#..##.",
  "##.#.#.",
  "####..#",
  ".###..#",
  ".##...#",
  "####..#",
  "##.#.#.",
  ".#..##.",
  "...#..#",
  "...#.#.",
  "####...",
  "####...",
  "...#.#.",
  "...#..#",
  ".#..##.",
  "",
  "#.###..#..#..###.",
  "...#.###..###.#..",
  "..#..#.#..#.#..#.",
  "...##.#.##.#.##..",
  "...##.#.##.#.##..",
  "..#..#.#..#.#..#.",
  "...#.###..###.#..",
  "#.###..#..#..###.",
  "..##.#..##..#.##.",
  ".##.#.#....#.#.##",
  ".####.##..##..###",
  "#.#.#...##...#.#.",
  "#...#.##..##.#...",
  ".##...#....#...##",
  ".#...#..##..#...#",
  ".#.#...####...#.#",
  "##.#....##....#.#",
  "",
  ".###..#....#..##.",
  ".###..#....#..##.",
  "#.##..##...##.###",
  "#...##..##..##.##",
  "###..#.#..##.#.##",
  "#.#.#.##.........",
  ".###.#.##.....##.",
  ".###.#.##.....##.",
  "#.#.#.##.........",
  ".##..#.#..##.#.##",
  "#...##..##..##.##",
  "",
  "...##....#.......",
  "#..##...###..##..",
  ".##..##.#..##..##",
  "#..#.##...##....#",
  "#.##...####.#..#.",
  "#...#......######",
  "##.#...##.#.#..#.",
  "#...#.#..####..##",
  "#.#.#..##..######",
  "####....#.###..##",
  ".####..#.##......",
  ".####..#.##......",
  "####....#.###..##",
  "#...#..##..######",
  "#...#.#..####..##",
  "",
  "##...#......#..",
  "##...#......#..",
  "...#.########.#",
  "#.#..##.##.##..",
  "..###.##..##.#.",
  ".#..#..#..#..#.",
  "###.##.####.##.",
  "#...#...##...#.",
  "..###.#....#.##",
  "",
  "#.#####",
  "..#####",
  "#.###.#",
  "#..###.",
  "#..##.#",
  ".##..#.",
  "..#...#",
  ".....##",
  ".....##",
  "",
  ".#.#.##..##.#.#",
  "...#........#..",
  "##...#.##.#...#",
  ".###..#..#..###",
  "##..##....##..#",
  ".#...#....#...#",
  "...####..##.#..",
  "###..######..##",
  "#...#.####.#...",
  ".#.##.#..#.##.#",
  "#.#.###..###.#.",
  ".#..#......#..#",
  "######.##.#####",
  "######.##.#####",
  ".#..#......#..#",
  "#.#.###..###.#.",
  ".#.##.#..#.##.#",
  "",
  "..#....######...#",
  "..####...##..#..#",
  ".##.###.##.###...",
  "#.#.....#....#.#.",
  ".#.#..###...###..",
  ".#....###...###..",
  "#.#.....#....#.#.",
  ".##.###.##.###...",
  "..####...##..#..#",
  "..#....######...#",
  ".#.###.###..#####",
  ".#.###.###..#####",
  "..#....######...#",
  "..####...##..#..#",
  ".##.###.##.###...",
  "",
  "##.###..#.##.",
  "##..#.#...#.#",
  "##..#.##..#.#",
  "##.###..#.##.",
  "#####.##.#.##",
  "###....##.#.#",
  ".......#...##",
  "##.##.#######",
  "###..#...#.##",
  ".......##.##.",
  "..#.##.##..#.",
  "",
  "#.###..#..#.####.",
  "......#.##.#....#",
  ".##..#..#.......#",
  ".#######...#....#",
  "##.....#..##..##.",
  "#..#....#######.#",
  "##..#.....###...#",
  "##..#.....###...#",
  "#..#....#######.#",
  "##.....#..##..##.",
  ".#######...#....#",
  ".##..#..#...#...#",
  "......#.##.#....#",
  "#.###..#..#.####.",
  "#.###..#..#.####.",
  "......#.##.#....#",
  ".##..#..#...#...#",
  "",
  "###.#.#",
  "...####",
  "##....#",
  "##...##",
  "...#...",
  "...#..#",
  "#..####",
  "..##.##",
  "###.#..",
  "..#.#.#",
  "...##..",
  "####.#.",
  "..#.##.",
  "..#.#.#",
  "..#.#.#",
  "",
  "##.#.###..##...#.",
  ".#..##...#..##...",
  ".###...##.#.####.",
  "#.#.##.#..###..##",
  ".###.#...##..###.",
  ".###.#...##..###.",
  "#.#.##.#..###..##",
  ".###...##.#.####.",
  ".#..##...#..##...",
  "##.#.###..##...#.",
  ".#..#....#...####",
  "###..####.#.#...#",
  ".###.##.#..######",
  "#..##...#####.###",
  "#..##...#####.#.#",
  "",
  "#....##..####.##.",
  "#....##..####.##.",
  ".#...#.....#.#..#",
  "...#...#####.##.#",
  "..##..##.###..##.",
  "#...###..##..####",
  "#...###..##..####",
  "..##..##.###..##.",
  "...#...#####.##.#",
  ".#...#....##.#..#",
  "#....##..####.##.",
  "",
  "#####..##.###",
  "#####..##.###",
  "###...##.#.#.",
  "#..##..#..#..",
  "##.#.#..#####",
  "##.###...#.##",
  "..#..###.##..",
  "..#.#...#####",
  "#########...#",
  "..##..##..#..",
  "..###.##.#..#",
  "",
  "..#####.##.",
  ".###.######",
  "..#..#..##.",
  "#####.#####",
  "#####.#####",
  "..#..#..##.",
  ".###.######",
  "..##.##.##.",
  "##.###.....",
  "#.#####.##.",
  "#.#........",
  "",
  "...#####.....",
  "...#####.....",
  "#....#.###..#",
  "#######...##.",
  "..##.#..##..#",
  "###......####",
  "..#.##.##..#.",
  ".##..###..#..",
  ".##..###..#..",
  "..#.##.###.#.",
  "###......####",
  "",
  ".###....###..",
  "...#.##.#...#",
  "##..#..#..###",
  "##..#..#..###",
  "...#.##.#...#",
  ".###....###..",
  "..###..###...",
  "##.######.###",
  "##...##...##.",
  "#...####...#.",
  "..#......#...",
  "##.####.#.##.",
  "##.##..##.###",
  "",
  "##..##.#.##..",
  ".#..#.#...#.#",
  "..##..#######",
  "..##..#######",
  ".#..#.#...#.#",
  "##..##.#..#..",
  "..##..#.#.###",
  ".####.##.#.##",
  "#....######..",
  "......###.#..",
  ".####.##..#..",
  ".####.....###",
  "#.##.#...#.#.",
  "#.##.####..#.",
  "#....##.#.#..",
  "######..####.",
  ".####....####",
  "",
  "##..####..##.#..#",
  ".####.#.###..####",
  ".#..#.##....##..#",
  ".####..#...###..#",
  "..##..#....#..##.",
  "..##..##.#.##.##.",
  "#....##...#..#..#",
  "..#....#.#....##.",
  "..##..#....######",
  "########.#..#####",
  "#######.##.###..#",
  "..##..#...#..####",
  "##..###.#..#..##.",
  "",
  "......##.....",
  "......##.....",
  "####.##.#.#.#",
  ".......#.####",
  ".##.##..#.###",
  ".#....###....",
  "#####.##.#.##",
  "###.#.##.#.##",
  ".#....###....",
  ".##.##..#.###",
  ".......#.####",
  "####.##.#.#.#",
  "......##.....",
  "",
  "..#..#..#..#...",
  ".##.##..##.##..",
  "##.##....##.###",
  "....#....#.....",
  "#............##",
  "...###...##....",
  "####......#####",
  "#...#....#...##",
  "...########....",
  "#.##.####.##.##",
  "##.#.####.#.###",
  "",
  ".#..######..#..##",
  "##..##..##..###..",
  "##..##..##..###..",
  ".#..######..#..##",
  "..#........#..#.#",
  "#.###.##.###.#..#",
  "#.#.######.###...",
  "",
  "###.#######....##",
  "######.#...####..",
  "##...#..#.#.##...",
  "####.#.##########",
  "##.####....#..#..",
  "##.....##.#.##.#.",
  ".######..##.##.##",
  "...####.###....##",
  "...#.##..........",
  "##..#....#.#..#.#",
  "##..#....#.#..#.#",
  "...#.##..........",
  "...####.###....##",
  ".######..##.##.##",
  "##.....##.#.##.#.",
  "##.####....#..#..",
  "####.#.##########",
  "",
  ".#...####...#.#.#",
  "##..#.##.#..##.#.",
  ".##...##...##.#..",
  "..###....###..#..",
  "#.#........#.#.##",
  "..#..####..#..#..",
  "..............###",
  "..............###",
  "..#..####..#..##.",
  "#.#........#.#.##",
  "..###....###..#..",
  ".##...##...##.#..",
  "##..#.##.#..##.#.",
  "",
  "..##.#..#",
  "###...##.",
  "..#.#####",
  ".##.##..#",
  "#........",
  "##..#.##.",
  "#........",
  "##..#.##.",
  "#...#.##.",
  "",
  "..#.##..###",
  "#.##.#.##..",
  "...##.#....",
  "...####....",
  "#.##.#.##..",
  "..#.##..###",
  "#..##.##.##",
  ".#.#...#.##",
  "##.##.#....",
  "#..#...#...",
  "##.#..#.#..",
  "..#.#..#.##",
  "##.#.##.#..",
  "",
  "#.....#",
  "#...#..",
  "#...#..",
  "#.....#",
  ".##.###",
  ".####..",
  "#.##.#.",
  "##..##.",
  "##..##.",
  "####.#.",
  ".####..",
  ".##.###",
  "#.....#",
  "",
  "........###..",
  "#..##..#.##..",
  ".######....##",
  "......#..##..",
  "#..##..#.#...",
  "###..####....",
  "#.#..#.##..##",
  "#.####.#.####",
  "##.##.##.##..",
  ".##..##...###",
  "##.##.##.#...",
  "###..####.#..",
  ".##..##.#....",
  "",
  ".####.#######",
  "..##..#.##...",
  "##..##.......",
  "##..##..#.#..",
  ".####..##....",
  ".####.##.##..",
  ".####.##.....",
  "#....##...#..",
  "#....#.##.#..",
  "...#..#.#....",
  "#.##.###.#.##",
  "",
  "#......##",
  ".#....#.#",
  "#.#....##",
  "..#..#...",
  "..####...",
  "..####...",
  ".#.##.#.#",
  ".#.##.#.#",
  "..####...",
  "",
  "##.#..##.",
  "..###.##.",
  "..###.##.",
  "##.#..##.",
  "..#...##.",
  "#...##..#",
  "#.#.##.##",
  "",
  "..##..##.#.###.",
  ".###..##.#.###.",
  "###...#.###..##",
  "#######.#...##.",
  "######.......##",
  "#..######...###",
  ".#..###.###.#..",
  "..#.##.##.#.##.",
  ".###.##..##.###",
  ".####.######..#",
  ".####.######..#",
  ".###.##..##.###",
  "..#.##.##.#.##.",
  "",
  "#.#...##..##...#.",
  ".....##.##.##....",
  ".##...######...##",
  ".##...######...##",
  ".....##.##.##....",
  "#.#...##..##...#.",
  "#####..#..#..####",
  ".....#.####.#....",
  "..##..#.##.#..##.",
  "####.########.###",
  "###.##......##..#",
  "...##..#..#..##..",
  "#.#.###....###.#.",
  ".##.###....###.##",
  ".##.#.##..##.#.##",
  ".#.#..#....#..#.#",
  "....#.#.##.#.#...",
  "",
  "#.##.#...#.##..##",
  ".....######....##",
  "#.##.###....##.##",
  "###...##.##.##.##",
  ".#...##..#.....#.",
  "#####.#.##.#..###",
  "#.#####.#..#.#.##",
  "#.....##..####...",
  "..#.###.....#####",
  "#.....#.#####....",
  "#.#.##.#.###.#.##",
  "#.#.##.#.###.#.##",
  "#.....#.#####....",
  "..#.###.....#####",
  "#.....##..####...",
  "#.#####.#..#.#.##",
  "#####.#.##.#..###",
  "",
  "###.#..###.#...#.",
  "##.#.#...####...#",
  "##.#.#...####...#",
  "###.#..###.#.#.#.",
  ".####.##..#.##.#.",
  "#.##.###..#.#####",
  "..#..########..##",
  "#.####.....#.##.#",
  "...###..##.####..",
  "..#...#....#...##",
  "..#####...#####..",
  "..#####...#####..",
  "..#...#....#...##",
  "...###..##.####..",
  "#.####.....#.##.#",
  "",
  "#..............",
  "#...##......##.",
  "..###..#..#.###",
  "##...##....##..",
  ".#.#...#..#...#",
  ".####.######.##",
  "..#...##..##...",
  "..#.##.#..#.##.",
  "#..##..####..##",
  "#..##..####..##",
  "..#.##.#..#.##.",
  "..#...##..##...",
  ".####.######.##",
  "",
  "#..###.#.#..#",
  "####.##.####.",
  "#..######.###",
  "#####...#..#.",
  "..#..#...#.##",
  ".......#####.",
  "######..#...#",
  "#..###.##.#..",
  "######.######",
  "....##..#.##.",
  "....##..#.##.",
  "######.######",
  "#..###.##.#..",
  "######..#...#",
  ".......#####.",
  "",
  ".###.##..#.",
  ".###.##..##",
  ".#...##...#",
  ".##.###....",
  ".##.###....",
  ".#...##...#",
  ".###.##..##",
  ".###.##..#.",
  "#....#..###",
  "#.#.##..#..",
  ".##.#......",
  "#...#...###",
  "###..###..#",
  "....###.##.",
  ".#..##.##.#",
  "",
  "#.#....##..#.#.",
  "#.#....##..#.#.",
  "#...#######...#",
  "##.##........#.",
  "...#.###...#.##",
  "####.....#.#.#.",
  "..#####.##..#..",
  "..#####.##..#..",
  "####.....#.###.",
  "...#.###...#.##",
  "##.##........#.",
  "#...#######...#",
  "#.#....##..#.#.",
  "",
  "...##.###..",
  "##....#.#.#",
  "...#.#.#.#.",
  ".#.##.##...",
  "#..##.#..#.",
  "######.#.##",
  "######.#.##",
  "#.###.#..#.",
  ".#.##.##...",
  "...#.#.#.#.",
  "##....#.#.#",
  "...##.###..",
  "#.###..#.#.",
  "..#..###.#.",
  "#..#..###..",
  "#..#..###..",
  "..#..###.#.",
  "",
  ".##.#..#.",
  ".#.##..#.",
  "..##....#",
  "##.#####.",
  ".#.....#.",
  "#.###.#.#",
  "#.###.#.#",
  ".#.....#.",
  "##.#####.",
  "..##....#",
  ".#.#...#.",
  ".##.#..#.",
  "..####.#.",
  ".#.#.##.#",
  ".#.#.##.#",
  "",
  "####...#....#...#",
  ".##..####..####..",
  "####....#.......#",
  "....##..####..##.",
  "....###......###.",
  "#..##..#.##.#..##",
  "....#.#......#.#.",
  "#..#.#.##..##.#.#",
  ".....##.#..#.##..",
  "",
  "..##.#......#.##.",
  "...#.#.#..#.#.#..",
  "###....#..#....##",
  "##.#.#......#.#.#",
  "#####...##...####",
  "##.#..#.##.#..#.#",
  "..#..##....##..#.",
  "###.#.######.#.##",
  "..###.######.###.",
  "..###.######.###.",
  "...#...#..#...#..",
  "###..#......#...#",
  "..#####....#####.",
  "##....#.##.#....#",
  "...#..######..#..",
  "..#.##......##.#.",
  "##.#####..#####.#",
  "",
  "####..#......#.#.",
  "#..#...#...#..#..",
  "....##..#.###.###",
  "......#..###.#..#",
  "#####.....##....#",
  "#..#..#.####.#.#.",
  "#..###...#.....#.",
  "#..##.#.#.#..####",
  "#..##.#.#.#..####",
  "#..###...##....#.",
  "#..#..#.####.#.#.",
  "",
  "#.##.#....#..#...",
  "###....###.######",
  "..###....######..",
  ".#.#..#.#......#.",
  "..########.##.###",
  "..########.##.###",
  ".#.#..#.#......#.",
  "",
  "..####...#......#",
  "...##....#...####",
  "#.#..#.#.##..####",
  "...##.....##.#...",
  "...##...#.#.#....",
  "##########..#....",
  "#..##..##.#...###",
  ".#....#.##...##..",
  "##....##...#.##..",
  "",
  "....#####.#.##.#.",
  "#....##.#.#.##..#",
  "##...#.....##..#.",
  "#..##..###...#..#",
  "#..##..###...#..#",
  "##...#.....##..#.",
  "#....##.#.#.##..#",
  "....#####.#.##.#.",
  "#..#.#..#..#.#.#.",
  ".#.#.....#.#..###",
  "#.#.#.#####.##.#.",
  "#.#.#.#####.##.#.",
  ".#.#.....#.#..###",
  "#..#.#..#..#.#.#.",
  "....#####.#.#..#.",
  "",
  "#####.#..##",
  "..###.#..##",
  "..###.#..##",
  "#####.#..##",
  "##..#......",
  "..###..#..#",
  "##.#.#..#.#",
  "#...##.##.#",
  "..####.#.#.",
  "###...#.#.#",
  "..#..##....",
  "##...##..#.",
  "..#.####...",
  "##..#.#.###",
  "..#.#.##...",
  "",
  "####.#.#.###.#.",
  "....#.#.######.",
  "....#.#.######.",
  "####.#.#.###.#.",
  "##.##..###.#...",
  "#..#.###.....#.",
  "#.#######..####",
  ".#.##.#...#..#.",
  "#..####.......#",
  ".##############",
  "#.#....#.###.#.",
  "#.#....#.###.#.",
  ".#########.####",
  "#..####.......#",
  ".#.##.#...#..#.",
  "",
  ".#.....#..#..",
  "#.#.#.#..##..",
  ".#####.#..###",
  "#.#....#.#...",
  "#.##...###...",
  "#.##...###...",
  "#.#......#...",
  "",
  "#.#..#......##..#",
  "..#..#..#..#..##.",
  "#.......#.###....",
  "##.###.###...#..#",
  "####..###.####..#",
  "...###.......####",
  "###..#..#...#####",
  "###..#..#...#####",
  "...###.......####",
  "####..###.####..#",
  "##.##..###...#..#",
  "",
  "...#..##.#.",
  "...#..##.#.",
  "#..#.#..#..",
  "...#.###.##",
  "##..#...##.",
  "###....#...",
  "#.#.#..###.",
  ".#..###....",
  ".#..###....",
  "#.#.#..###.",
  "###....#...",
  "##..#...##.",
  "...#.###.#.",
  "#..#.#..#..",
  "...#..##.#.",
  "",
  "...#####.##.#",
  "#.##.........",
  "#.##.........",
  "...#####.##.#",
  ".#######....#",
  "##.#..#..##..",
  "....##...##..",
  "..#.##..#..#.",
  ".###.##......",
  ".#..###......",
  "...#.#.##...#",
  "",
  ".#..#...#.##.",
  "...#####.#..#",
  "...#####.#..#",
  ".#..#...#.##.",
  "#...####.####",
  "......#..#.##",
  ".##..#.#..##.",
  "#.#.#.##..#..",
  "#.#.#.##..#..",
  ".##..#.#..##.",
  "......#..#.##",
  "#...####.####",
  "....#...#.##.",
  "",
  "##....#.##.#.",
  ".........#.##",
  "##.#...#....#",
  "##.#...#....#",
  ".........####",
  "##....#.##.#.",
  "####.##...#.#",
  "...#.....###.",
  "..#######.#..",
  "",
  "#.###.##.###.##",
  "###...##...#.##",
  ".....#..#......",
  "#..#......#..##",
  "##.########.###",
  "#...#.##.#...##",
  "##.###..###.###",
  ".##.##..##.##..",
  "###.#....#.####",
  "",
  "..###.##.##..",
  "..#........#.",
  "##...####...#",
  "...#.####.#..",
  "....##..##...",
  "..##.####.##.",
  "...#..##..#..",
  "##...#..#...#",
  "##.#......#.#",
  "",
  "......#",
  "..#..#.",
  "####...",
  "###.###",
  "..##.##",
  "..#..#.",
  "..###.#",
  "##..###",
  "##..###",
  "..###.#",
  "..##.#.",
  "",
  "...##....##..",
  "...##....##..",
  "..####..####.",
  "####......###",
  "#..#.#..#.#..",
  "#.#.##..##.#.",
  ".############",
  "###...##..###",
  "##.########.#",
  "#.#..#..#..#.",
  "#.####..####.",
  "#.#.######.#.",
  ".#.##.##.##.#",
  ".#...####...#",
  "##..##..##..#",
  "",
  "###....",
  "###....",
  "#.###.#",
  "###....",
  "..##..#",
  ".######",
  "#.#.##.",
  "##..##.",
  ".#.....",
  "",
  "####..#",
  "####..#",
  "...####",
  "....##.",
  "...#..#",
  ".##....",
  ".#.....",
  "#.##..#",
  "##.#..#",
  ".#.####",
  ".##..#.",
  "##.....",
  ".#..##.",
  "#.##..#",
  ".##....",
  "##.....",
  "..#####",
  "",
  "##....##.#.###.",
  "....##.##.#..##",
  ".#.######..#...",
  "...#.#.#.##.#..",
  "###.#..#.#..##.",
  "##.###.....#.##",
  "##.###.....#.##",
  "###.#..#.#..##.",
  "...#.#.#.##.#..",
  "",
  "...#.#..#",
  "###.#.#.#",
  "###.####.",
  ".....##.#",
  ".#.###...",
  ".#.###..#",
  ".....##.#",
  "###.####.",
  "###.#.#.#",
  "...#.#..#",
  ".##..#.#.",
  ".##..#.#.",
  "...#.#..#",
  "",
  ".#.#.##.#....",
  "###..##..#.##",
  "#.....###....",
  "#..##..#.....",
  "#..####.##...",
  "###..####.#..",
  "###..####.#..",
  "#..####.##...",
  "#.###..#.....",
  "",
  "#######..#..##.#.",
  "#####.#..#..##.#.",
  "##...####...###..",
  "..####.#.#..##...",
  "###.#######....##",
  "..#.###.#.#.#..#.",
  "...#.###.####.#..",
  "",
  "#.######.##",
  ".#......#.#",
  ".#......#.#",
  "#.######.##",
  "#.##..##.#.",
  ".##.##.##..",
  "#######.##.",
  "..######..#",
  "##..##..###",
  ".########..",
  "#.######.##",
  "##.####.##.",
  "...#..#....",
  "#.######.#.",
  "..##..##...",
  "",
  "#........##",
  ".#.#.#.....",
  ".#...#.....",
  "#........##",
  "##.##..##..",
  ".#..#..##..",
  "##.#.#...##",
  "#.#..###...",
  "#.#.#.##...",
  "",
  ".##...#.###..",
  ".#..###...#..",
  "..##.#.##....",
  ".#..#.##.####",
  "...#...#.#.##",
  ".#.##.###.###",
  "#.###......##",
  "#...###..#.##",
  ".###.##.##.##",
  "#.###.#.#..##",
  "#.###.#.#..##",
  ".###.##.##.##",
  "#...###.##.##",
  "",
  "####..###.#",
  "......###.#",
  ".....#.....",
  ".....#..#.#",
  "....#####..",
  ".##...##.##",
  "....######.",
  "####.##.#..",
  "#######...#",
  ".##.###..##",
  ".##.####.##",
  ".......#.##",
  "#####...###",
  "#######..##",
  "#####..#.##",
  "####..#...#",
  "####..#..##",
  "",
  ".....#.####.#",
  "#.###..#..#..",
  "##.#.#..##..#",
  "#.#.##.#..#.#",
  ".....###..##.",
  "####..#.##.#.",
  ".##..########",
  ".##..########",
  "####..#.##.#.",
  "",
  "#....######",
  "#....####.#",
  "#....#..#.#",
  "##..####...",
  ".####......",
  "..##.....#.",
  ".......##.#",
  "......#...#",
  "#.##.##.##.",
  "......#.#..",
  ".####..#..#",
  "",
  "...#...#..#....#.",
  "#...##..#..##.#..",
  "###.####.#..##..#",
  "###.##.##.######.",
  "...#.###.#......#",
  "#..###.#..##..##.",
  "#..###.#..##..##.",
  "",
  "#########.#..##",
  "..#....#.#.#.#.",
  "#.#.#.###...#..",
  "#....##.#.#..##",
  "#.....#.#.#..##",
  "#.#...###.#...#",
  "..####..#.#...#",
  "..####..#.#...#",
  "#.#...###.#...#",
  "#.....#.#.#..##",
  "#....##.#.#..##",
  "",
  "..##...",
  "...##.#",
  "...##.#",
  "..##...",
  "..#...#",
  "...#...",
  "##...#.",
  "....#.#",
  "..###..",
  "#####..",
  "..###..",
  "....###",
  ".#.##..",
  "...#...",
  "####...",
  "",
  "##....######..#",
  ".#....#.##.#..#",
  "########.###..#",
  ".##...#..#.....",
  ".##..##.##.####",
  ".######.##.#..#",
  "#..##..#...####",
  "##.##.#####.##.",
  ".#....#.##.#..#",
  "#......###.####",
  "#.#..#.#.#..##.",
  "###..###..#.##.",
  "#########.#.##.",
  "",
  "#.#####.#..####..",
  "...###.....#..#..",
  "#...#..##...##...",
  "####.##.#.##..##.",
  "#########.##..##.",
  "#...#..#.########",
  "#..##..#.########",
  "",
  "..#####",
  "..##...",
  "#..#.##",
  "#.#.###",
  ".#..#..",
  "....###",
  ".#.#.#.",
  "....#..",
  "#..####",
  ".##..##",
  ".##..##",
  "#..####",
  "....#..",
  "",
  "###..#.##",
  "#.###.#.#",
  "#.###.#.#",
  "###..#.##",
  ".#.#.###.",
  ".#.###.##",
  ".#####.##",
  "",

  "#####.#.##...",
  "#..##...##...",
  ".##..#......#",
  "......#.##.#.",
  "####..######.",
  "....#.######.",
  ".##...#....#.",
  ".##.#........",
  "#######....##",
  "#######....##",
  "####.#..##..#",
  "#..#.###..###",
  "#####.#.##.#.",
  "####.#.#..#.#",
  "#..####.##.##",
  "",
  "####..#####",
  "#.#.##.#.#.",
  "###....###.",
  "###....###.",
  "#.#.##.#.#.",
  "####..#####",
  "#..#..#..#.",
  "#.##..##.##",
  "...####....",
  "######.###.",
  "##..##..###",
  "..#.##.#..#",
  "#.#.##.#.##",
  "####..####.",
  "#.##..##.#.",
  ".###..###.#",
  "#..#..#..#.",
  "",
  "#....#.##..##",
  "........#..#.",
  "......####.#.",
  "......####.#.",
  "........#..#.",
  "#....#.##..##",
  "#.##.##.##.##",
  "#....#..#....",
  "#.##.##..#.#.",
  "##.#####.#.##",
  "..##........#",
  "......##.##.#",
  "#....#.#..###",
  "",
  "##..#...#",
  "##..#..##",
  "#..#.###.",
  "######..#",
  "#.###....",
  "....#....",
  "....#....",
  "#.###....",
  "######..#",
  "",
  "........#....##.#",
  ".####...#....#.#.",
  "..##..####.#.##.#",
  "##..##.....##..#.",
  "###.##..#######..",
  ".#..#.....####.##",
  ".#..#.....####.##",
];

const example = [
  "#.##..##.",
  "..#.##.#.",
  "##......#",
  "##......#",
  "..#.##.#.",
  "..##..##.",
  "#.#.##.#.",
  "",
  "#...##..#",
  "#....#..#",
  "..##..###",
  "#####.##.",
  "#####.##.",
  "..##..###",
  "#....#..#",
];

const example2 = [
  '.##.#.##.',
  '.##.#.##.',
  '##.....##',
  '..###...#',
  '###.##.#.',
  '.#...##..',
  '.#...#...'
];

export { input, example, example2, resultsPart1 };