import { RegisterFormField } from "./RegisterFromField.interface";

export type NewUser = Omit<RegisterFormField, 'confirmPassword'>;