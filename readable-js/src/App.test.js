import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
test('renders learn react link', () => {
    const { getByText } = render(React.createElement(Provider, { store: store },
        React.createElement(App, null)));
    expect(getByText(/learn/i)).toBeInTheDocument();
});
