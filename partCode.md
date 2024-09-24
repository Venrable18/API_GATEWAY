import express, { Request, Response, NextFunction } from 'express';
import ApiError from './path-to-api-error';

const app = express();

app.get('/example', (req: Request, res: Response, next: NextFunction) => {
    try {
        // Simulate an error
        throw new ApiError('This is a custom API error message', 400);
    } catch (error) {
        next(error);
    }
});


// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        // If the error is an instance of ApiError
        res.status(err.status).json({
            success: err.success,
            message: err.message,
            fields: err.fields,
        });
    } else {
        // Handle unknown errors
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred',
        });
    }
});


In TypeScript, `<T>` represents a generic type parameter. Generics are a powerful feature that allows you to write flexible and reusable code by defining functions, classes, and interfaces that work with a variety of types while maintaining type safety.

### Understanding Generics with `<T>`

1. **Generic Type Parameter**:
   - **`<T>`** is a placeholder for a type that will be specified later. The actual type is provided when the generic is used or instantiated.

   ```typescript
   function identity<T>(arg: T): T {
       return arg;
   }
   ```

   In the example above:
   - `T` is a generic type parameter.
   - The function `identity` takes a parameter `arg` of type `T` and returns a value of type `T`.
   - When you call `identity`, you specify the actual type for `T`.

2. **Using Generics**:

   You can use generics with various constructs:

   - **Functions**:
     ```typescript
     function identity<T>(arg: T): T {
         return arg;
     }
     
     // Usage
     const num = identity<number>(42);      // `T` is `number`
     const str = identity<string>("Hello"); // `T` is `string`
     ```

   - **Classes**:
     ```typescript
     class Box<T> {
         private content: T;
         
         constructor(value: T) {
             this.content = value;
         }
         
         getContent(): T {
             return this.content;
         }
     }
     
     // Usage
     const numberBox = new Box<number>(123);
     console.log(numberBox.getContent()); // 123
     
     const stringBox = new Box<string>("Test");
     console.log(stringBox.getContent()); // "Test"
     ```

   - **Interfaces**:
     ```typescript
     interface Pair<T, U> {
         first: T;
         second: U;
     }
     
     // Usage
     const stringNumberPair: Pair<string, number> = {
         first: "Hello",
         second: 42
     };
     
     console.log(stringNumberPair.first);  // "Hello"
     console.log(stringNumberPair.second); // 42
     ```

3. **Constraints on Generics**:

   You can constrain a generic type to ensure it adheres to certain requirements:

   ```typescript
   interface Lengthwise {
       length: number;
   }
   
   function logLength<T extends Lengthwise>(item: T): void {
       console.log(item.length);
   }
   
   logLength("Hello");          // Works, string has `length`
   logLength([1, 2, 3]);        // Works, array has `length`
   logLength(123);              // Error, number does not have `length`
   ```

   In this example:
   - `T extends Lengthwise` means that `T` must have a `length` property.
   - This ensures that `logLength` only accepts types that have a `length` property.

4. **Default Generic Type Parameters**:

   You can provide a default type for a generic parameter:

   ```typescript
   function wrap<T = string>(value: T): T {
       return value;
   }
   
   wrap(123);          // `T` is `number`
   wrap("Hello");     // `T` is `string`
   wrap();            // `T` defaults to `string`
   ```

   In this example:
   - If you don't specify a type for `T`, it defaults to `string`.

### Summary

- **`<T>`**: A generic type parameter that allows you to define flexible and reusable functions, classes, and interfaces.
- **Usage**: Specify the actual type when using the generic, ensuring type safety.
- **Constraints**: Restrict the types that can be used with generics by extending other types or interfaces.
- **Defaults**: Provide default types for generics when no type is specified.

Generics are a powerful feature that allows you to create more flexible and reusable code while maintaining type safety. If you have further questions or need more examples, feel free to ask!