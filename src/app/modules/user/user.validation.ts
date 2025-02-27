import { z } from "zod";


const userValidationSchema = z.object({
    pasword: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' }),
    email: z.string().email()
});

export default userValidationSchema;