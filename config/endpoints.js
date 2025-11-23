export const Endpoints = {
  api: {
    auth: {
      login: '/api/auth/login'
    },
    productos: {
      base: '/api/productos',
      listar: '/api/productos',
      listarTodos: '/api/productos/todos',
      obtener: (id) => `/api/productos/${id}`,
      crear: '/api/productos',
      modificar: (id) => `/api/productos/${id}`,
      activar: (id) => `/api/productos/${id}/activar`,
      desactivar: (id) => `/api/productos/${id}/desactivar`
    },
    ventas: {
      base: '/api/ventas',
      listar: '/api/ventas',
      obtener: (id) => `/api/ventas/${id}`,
      crear: '/api/ventas'
    },
    usuarios: {
      base: '/api/usuarios',
      crear: '/api/usuarios'
    }
  },
  admin: {
    auth: {
      login: '/admin/login',
      logout: '/admin/logout'
    },
    dashboard: {
      base: '/admin/dashboard',
      ver: '/admin/dashboard'
    },
    productos: {
      nuevo: '/admin/productos/nuevo',
      editar: (id) => `/admin/productos/editar/${id}`,
      activar: (id) => `/admin/productos/activar/${id}`,
      desactivar: (id) => `/admin/productos/desactivar/${id}`
    }
  }
};

export default Endpoints;

