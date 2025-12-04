import { validateNameLength, validatePasswordLength } from "./length"; 

describe('Field length validation', () => {
    describe('Name field', () => {       
        let name = '';
        test('A name should fail length validation if it is not set', () => {
            expect(validateNameLength(name)).toEqual(false);
        });

        test('A name should fail length validation if it is less than 4 characters', () => {
            name = 'Tes';
            expect(validateNameLength(name)).toEqual(false);
        });

        test('A name should pass length validation if it is between 4 or 30 characters', () => {
            name = 'Test';
            expect(validateNameLength(name)).toEqual(true);
        });

        test('A name should pass length validation if it is between 4 or 30 characters', () => {
            name = 'TestTestTestTestTestTestTesttt';
            expect(validateNameLength(name)).toEqual(true);
        });

        test('A name should fail length validation if it is more than 30 characters', () => {
            name = 'TestTestTestTestTestTestTestTest';
            expect(validateNameLength(name)).toEqual(false);
        });
    });
    
    describe('Password field', () => {       
        let password = '';
        test('A password should fail length validation if it is not set', () => {
            expect(validatePasswordLength(password)).toEqual(false);
        });

        test('A password should fail length validation if it is less than 6 characters', () => {
            password = 'Tes';
            expect(validatePasswordLength(password)).toEqual(false);
        });

        test('A password should pass length validation if it is between 6 or 20 characters', () => {
            password = 'TestPa';
            expect(validatePasswordLength(password)).toEqual(true);
        });

        test('A password should pass length validation if it is between 6 or 20 characters', () => {
            password = 'PassPassPassPassPass';
            expect(validatePasswordLength(password)).toEqual(true);
        });

        test('A password should fail length validation if it is more than 20 characters', () => {
            password = 'PassPassPassPassPassPass';
            expect(validatePasswordLength(password)).toEqual(false);
        });
    });
});