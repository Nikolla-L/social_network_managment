import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import { seedUser } from './seeder/user';
import { seedSystemSetting } from './seeder/systemSetting';
import userRoutes from './routes/users';
import postRoutes from './routes/post';
import commentRoutes from './routes/comment';
import systemRoutes from './routes/system';
import testRoutes from './routes/test';
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './config/swagger';

const app: Express = express();
const PORT = process.env.PORT || 3001;
const specs = swaggerJSDoc(swaggerOptions);

app.set('view engine', 'ejs');
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.render('index')
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', userRoutes);
app.use('/api/posts/', postRoutes);
app.use('/api/comments/', commentRoutes);
app.use('/api/system-settings/', systemRoutes);
app.use('/api/test', testRoutes);

connectDB('mongodb+srv://nikolla:12341234@nikoloza.84pn3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
    seedUser();
    seedSystemSetting();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}).catch(error => console.error(error))
      
