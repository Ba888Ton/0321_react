import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button 
    className={props.backgroundColor , props.value === 'O' ? 'zero' : 'iks'} 
    id="square" 
    onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        backgroundColor={((this.props.highlited).indexOf(i) !== -1) ? 'green' : ''}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      barbie: 0,
      toma: 0,
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      highlited: [],
      winner: '',
    }
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares)?.winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
    if (this.calculateWinner(squares)?.winner) {
      this.checkWinner(this.calculateWinner(squares))
    }
  }
  checkWinner = ({winner, line}) => {
    if (winner === 'X'){
      this.setState(prevState => {return {
        barbie: prevState.barbie + 1, 
        winner: ' Варя',
        highlited: line,
      }})
    } else {
      this.setState(prevState => {return {
        toma: prevState.toma + 1, 
        winner: ' Тома',
        highlited: line,
      }})
    } 
  }
  resetField = () => {
    this.setState(      
      {history: [{
      squares: Array(9).fill(null),
    }],
    xIsNext: true,
    highlited: [],
    winner: '',
  })
  }
  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {winner: squares[a], line: lines[i]};
      }
    }
    return null;
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    let status;
    if (this.state.winner) {
      status = 'Выиграла ' + this.state.winner;
    } else {
      status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="wrapper">
          <div className="game-board">
            <Board 
              highlited={this.state.highlited}
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
            {this.state.winner && 
            <div className="win">Победа!!!</div> }
          </div>
          <div className="game-info">
            <div>{status}</div>
            {/* <ol>{(this.state.history).map((step, index )=> <button>{index + 1}</button>)}</ol> */}
          </div>
          <div className="TotalScore">
          
            <h3>Счёт побед:</h3>
            <p>Варя победила {this.state.barbie} раз</p>
            <p>Тома победила {this.state.toma} раз</p>
            <br />
            <button className="repeat" onClick={this.resetField}> ЕЩЕ РАЗ</button>
          </div>
        </div>
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
