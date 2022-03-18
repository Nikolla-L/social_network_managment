import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import { seedUser } from './seeder/user';
import userRoutes from './routes/users';
import testRoutes from './routes/test';
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './config/swagger';

const app: Express = express();
const PORT = process.env.PORT || 3001;
const specs = swaggerJSDoc(swaggerOptions);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running...')
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', testRoutes);
app.use('/api', userRoutes);

connectDB('mongodb+srv://nikolla:12341234@nikoloza.84pn3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
    seedUser();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}).catch(error => console.error(error))
      
