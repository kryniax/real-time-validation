import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ValidationForm from './ValidationForm';

describe('ValidationForm component', () => {
    test('Render email input', () => {
        render(<ValidationForm />);
     
        const inputEmail = screen.getByTestId("email");
        expect(inputEmail).toBeInTheDocument();
        expect(inputEmail).toHaveAttribute("type", "email");
      });

      test('Pass valid email', () => {
        render(<ValidationForm />);
     
        const inputEmail = screen.getByTestId("email");
        userEvent.type(inputEmail, "ee@op.pl");
     
        expect(screen.getByTestId("email")).toHaveValue("ee@op.pl");
      });
      
      test('Pass invalid email', () => {
        render(<ValidationForm />);
     
        const inputEmail = screen.getByTestId("email");
        userEvent.type(inputEmail, "ee@op");
     
        expect(screen.getByTestId("email")).toHaveValue("ee@op");
        expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
      });
});
