import '@testing-library/jest-dom'

import {render, fireEvent, screen, container} from '@testing-library/react'
import Generate from './Generate'

test('Test QR visible on init', async () => {
    render(<Generate />);
    const qr = screen.getByTestId("qr");
    expect(qr).toBeVisible();
})

test('Test QR visible on generate button press', async () => {
    render(<Generate />);
    const qr = screen.getByTestId("qr");
    const button = screen.getByTestId("gen");
    fireEvent.click(button);
    expect(qr).toBeVisible();
})

test('Test QR invisible on hide button press', async () => {
    render(<Generate />);
    const qr = screen.getByTestId("qr");
    const button = screen.getByTestId("hide");
    fireEvent.click(button);
    expect(qr).not.toBeVisible();
})