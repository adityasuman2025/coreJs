import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TestComp from '../src/TestComp';

test('renders button correctly', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<TestComp text="Click Me" onClick={handleClick} />);

    const button = getByText('Click Me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
});