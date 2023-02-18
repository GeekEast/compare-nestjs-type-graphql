
# Compare Nest.js and Type-Graphql

- [Compare Nest.js and Type-Graphql](#compare-nestjs-and-type-graphql)
  - [Dependency Injection](#dependency-injection)
  - [Validation and Transformation](#validation-and-transformation)
  - [Contextual Logging](#contextual-logging)

## Dependency Injection

**When to use Dependency Injection in TypeScript?**

Dependency Injection (DI) is a design pattern that allows for the separation of concerns in software development. In TypeScript, DI is particularly useful in large-scale projects where managing dependencies manually can become complex and difficult to maintain.

Here are some situations where you may want to consider using Dependency Injection in TypeScript:

- When your application has multiple classes that depend on one another.
- When you want to improve the testability of your code by making it easier to mock or stub dependencies during testing.
- When you want to make your code more modular and reusable by separating concerns and dependencies.
- When you want to decouple your code from specific implementations, allowing for greater flexibility and easier maintenance.

To implement DI in TypeScript, you can use a variety of techniques, including constructor injection, property injection, and method injection. Constructor injection is the most common and preferred method of DI in TypeScript, as it allows for the injection of dependencies at object creation time.

To summarize, Dependency Injection is a useful pattern to use in TypeScript when you want to manage dependencies and improve the modularity, testability, and maintainability of your code. It can help make your code more flexible, decoupled, and reusable, which is particularly important in large-scale projects.

**What is the benefit to declare dependency type as interface in TypeScript? And what is the use case for that? for example, how is it used in repository pattern?**

In TypeScript, declaring a dependency type as an interface provides a number of benefits. The primary benefit is that it helps to enforce the contract between the dependency and the consumer of the dependency. This means that the interface provides a clear definition of the expected properties and methods that the dependency should have, making it easier for developers to work with the dependency and to ensure that it is being used correctly.

There are several use cases for declaring dependency types as interfaces in TypeScript. One common use case is in the implementation of the repository pattern. In this pattern, a repository is responsible for encapsulating the logic required to access and manipulate data from a data source. The repository pattern can be used with a wide range of data sources, such as a database, a file system, or an API.

By defining the interface for the repository, you can ensure that any class that implements the repository has the same set of methods and properties, regardless of the specific data source being used. This makes it easy to swap out one data source for another, or to write tests that use a mock repository with the same interface.

Here is an example of how an interface might be used in the repository pattern in TypeScript:

```typescript
interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  add(item: T): Promise<void>;
  update(item: T): Promise<void>;
  delete(id: string): Promise<void>;
}

class MyRepository implements IRepository<MyData> {
  // Implement methods here
}
```

In this example, the IRepository interface defines the contract for any repository class, with methods to retrieve, add, update, and delete data. The MyRepository class implements this interface, providing the required functionality to access data of type MyData. By using the interface, it's easy to swap out the MyRepository class with another class that implements the same interface, providing a flexible and testable solution for accessing data.

checkout branch to see the code example
```sh
git checkout -b dependency-injection
```

## Validation and Transformation

| Feature                                          | Type-GraphQL | Nest.js |
| ------------------------------------------------ | ------------ | :-----: |
| compose validation and transformation seamlessly |              |    ✅    |
| easy to add custom validation logic              |              |    ✅    |


checkout branch to see the code example
```sh
git checkout -b validation-and-transformation
```
## Contextual Logging

In Nest.js, you could install the `nestjs-pino` module to do logging with request information in any place of your codebase.
checkout branch to see the code example
```sh
git checkout -b contextual-logging
```