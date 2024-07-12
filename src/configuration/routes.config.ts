import { Router } from 'express'
import helthCheckRoutes from '../domains/suporte/adapter/driver/rest/routes/health-check.route'
import pagamentoRoutes from '../domains/pagamento/adapter/driver/rest/routes/pagamento.route'

const routes = Router()

routes.use('/api/health-check', helthCheckRoutes)
routes.use('/api/pagamentos', pagamentoRoutes)

export default routes;
