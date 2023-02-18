

## Dependency Injection
- install and run the project
```sh
npm install
npm start
```
- go to `http://localhost:3000` in your browser
- try to switch dependencies in `src/app.module.ts`, and refresh your browser

```typescript
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    // * comment in/out to switch between dependency implementations
    { provide: 'AppRepo', useClass: MongoRepo },
    // { provide: 'AppRepo', useClass: DynamoDBRepo },
  ],
})
export class AppModule {}
```