import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TestComp from '../src/TestComp';


global.fetch = jest.fn(url => {
    if (url === 'https://api.example.com/user') {
        return Promise.resolve({
            json: () => Promise.resolve({ name: 'John Doe', email: 'john@example.com' }),
        });
    } else if (url === 'https://api.example.com/posts') {
        return Promise.resolve({
            json: () => Promise.resolve([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]),
        });
    }
});

test('renders button correctly', async () => {
    const handleClick = jest.fn();
    const { getByText } = render(<TestComp text="Click Me" onClick={handleClick} />);

    const button = getByText('Click Me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    const nameElement = await screen.findByText('John Doe');
    const emailElement = screen.getByText('Email: john@example.com');

    expect(nameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();

    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
});