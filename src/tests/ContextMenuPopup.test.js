import React from 'react';
import { render, screen } from '@testing-library/react';
import ContextMenuPopup from '../components/Chat/ContextMenuPopup';

describe('ContextMenuPopup component', () => {
  test('should have the right message in the dom', () => {
    render(<ContextMenuPopup />);
    const copyButton = screen.getByRole('presentation');
    expect(copyButton.textContent).toBe('Copy Text');
  });
  test('should not have an empty message', () => {
    render(<ContextMenuPopup />);
    const copyButton = screen.getByRole('presentation');
    expect(copyButton.textContent === '').not.toBeTruthy();
  });
  test('should not have an empty message', () => {
    render(<ContextMenuPopup />);
    const copyButton = screen.getByRole('presentation');
    expect(copyButton.textContent === '').toBeFalsy();
  });
  test('should have the message which is defined', () => {
    render(<ContextMenuPopup />);
    const copyButton = screen.getByRole('presentation');
    expect(copyButton.textContent).toBeDefined();
  });
  test('should have the message which length is 9', () => {
    render(<ContextMenuPopup />);
    const copyButton = screen.getByRole('presentation');
    expect(copyButton.textContent).toHaveLength(9);
  });
  test('should have the message which includes word "copy"', () => {
    render(<ContextMenuPopup />);
    const copyButton = screen.getByRole('presentation');
    expect(copyButton.textContent).toMatch(/copy/i);
  });

  test('should have the message which is defined', () => {
    render(<ContextMenuPopup />);
    const copyButton = screen.getByRole('presentation');
    expect(copyButton.textContent).not.toBeUndefined();
  });
  test('should have the message which is not null', () => {
    render(<ContextMenuPopup />);
    const copyButton = screen.getByRole('presentation');
    expect(copyButton.textContent).not.toBeNull();
  });
  test('should have the message which length is more than 8', () => {
    render(<ContextMenuPopup />);
    const copyButton = screen.getByRole('presentation');
    expect(copyButton.textContent.length).not.toBeLessThan(9);
  });
  test('should have the message which length is less than 20', () => {
    render(<ContextMenuPopup />);
    const copyButton = screen.getByRole('presentation');
    expect(copyButton.textContent.length).not.toBeGreaterThan(20);
  });
});
