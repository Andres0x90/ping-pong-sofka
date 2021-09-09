class Game
{
    constructor(board)
    {
        this.board = board;
        this.players = ["Sofkiano1", "Sofkiano2"];
        this.winner;
        this.scores = [0,0];
    }

    hasAnyPlayerWon()
    {
        if (this.board.ball.x < 0)
        {
            this.winner = this.players[1];
            this.scores[1] += 1;
            return true;
        }
        else if (this.board.ball.x > 800)
        {
            this.winner = this.players[0];
            this.scores[0] += 1;
            return true;
        }
        return false;
    }
}