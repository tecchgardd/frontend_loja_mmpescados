import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import './assets/styles/App.css'
import './assets/styles/Shop.css'
import Shop from './pages/shop/Shop'
import ShopLogin from './pages/shop/ShopLogin'
import ShopRegister from './pages/shop/ShopRegister'
import ShopOrders from './pages/shop/ShopOrders'
import ShopAccount from './pages/shop/ShopAccount'
import { SessionProvider, useSession } from './contexts/SessionContext'

function AppRoutes() {
  const { user, loading, clearSession } = useSession()
  const isShopUser = user?.role === 'USER'

  function publicRoute(element: React.ReactElement) {
    if (loading) return null
    if (isShopUser) return <Navigate to="/loja" replace />
    return element
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#080b16' }}>
        <div style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#129e62', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/loja" replace />} />
      <Route path="/login" element={publicRoute(<ShopLogin />)} />
      <Route path="/loja/login" element={publicRoute(<ShopLogin />)} />
      <Route path="/cadastro" element={publicRoute(<ShopRegister />)} />

      <Route
        path="/loja"
        element={isShopUser
          ? <Shop onLogout={clearSession} />
          : <Navigate to="/loja/login" replace />
        }
      />
      <Route
        path="/loja/pedidos"
        element={isShopUser
          ? <ShopOrders />
          : <Navigate to="/loja/login" replace />
        }
      />
      <Route
        path="/loja/conta"
        element={isShopUser
          ? <ShopAccount />
          : <Navigate to="/loja/login" replace />
        }
      />
      <Route path="*" element={<Navigate to="/loja" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <NuqsAdapter>
          <AppRoutes />
        </NuqsAdapter>
      </BrowserRouter>
    </SessionProvider>
  )
}
