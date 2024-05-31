import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from './src/components/Board.js';

test('renders a 3x3 grid', () => {
  const { getAllByTestId } = render(<TicTacToe />);
  const cells = getAllByTestId('cell');
  expect(cells).toHaveLength(9);
});

test('alternates X and O on click', () => {
  const { getAllByTestId } = render(<Board />);
  const cells = getAllByTestId('cell');
  fireEvent.click(cells[0]);
  expect(cells[0].textContent).toBe('X');
  fireEvent.click(cells[1]);
  expect(cells[1].textContent).toBe('O');
});

test('detects a winner', () => {
  const { getAllByTestId, getByTestId } = render(<Board />);
  const cells = getAllByTestId('cell');
  const status = getByTestId('status');

  fireEvent.click(cells[0]); 
  fireEvent.click(cells[3]); 
  fireEvent.click(cells[1]); 
  fireEvent.click(cells[4]);
  fireEvent.click(cells[2]);
  expect(status.textContent).toBe('The Winner is : X');
});
