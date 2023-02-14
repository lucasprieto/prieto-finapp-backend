import App from '@/app'
import IndexRoute from '@/routes/index.route'
import ExpenseRoute from './routes/expense.route'
import UserRoute from './routes/user.route'

const routes = [new IndexRoute(), new UserRoute(), new ExpenseRoute()]

const app = new App(routes)

app.listen()
