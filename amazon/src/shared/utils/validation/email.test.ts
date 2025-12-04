import { validateEmail } from "./email";

describe('Email validation', () => {
    let email = '';
    test('An empty input should not be valid', () => {
        expect(validateEmail(email)).toEqual(false);
    });

    test('It should have an @ symbol', () => {
        email = 'test@gmail.com'
        expect(email.includes('@')).toEqual(true);
    });

    test('It should have an . symbol', () => {
        expect(email.includes('.')).toEqual(true);
    });

    test('A valid email should pass validation', () => {
        expect(validateEmail(email)).toEqual(true);
    });

    test('An invalid email should not pass validation', () => {
        email = 'test@gmail';
        expect(validateEmail(email)).toEqual(false);
    });
});