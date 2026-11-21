export const ERROR_CODES = {
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
    ORDER_NOT_FOUND: 'ORDER_NOT_FOUND',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    DELIVERY_NOT_FOUND: 'DELIVERY_NOT_FOUND',
    INVALID_EMAIL_FORMAT: 'INVALID_EMAIL_FORMAT',
    INVALID_USER_ROLE: 'INVALID_USER_ROLE',
    MISSING_REQUIRED_FIELDS: 'MISSING_REQUIRED_FIELDS',
    EMAIL_EXISTS: 'EMAIL_EXISTS',
    NON_DRIVER_USER: 'NON-DRIVER_USER',
    INVALID_USER: 'INVALID_USER',
    ORDER_LENGTH_INVALID: 'ORDER_LENGTH_INVALID',
    MOCK_NOT_ENOUGH_CLIENTS: 'MOCK_NOT_ENOUGH_CLIENTS',
    MOCK_NOT_ENOUGH_DRIVERS: 'MOCK_NOT_ENOUGH_DRIVERS',
    MOCK_NOT_ENOUGH_ORDERS: 'MOCK_NOT_ENOUGH_ORDERS',
    INVALID_MOCK_QUANTITY: 'INVALID_MOCK_QUANTITY',
    MAX_MOCK_REACHED: 'MAX_MOCK_REACHED',
    MOCK_NOT_ENOUGH_STORE_OWNERS: 'MOCK_NOT_ENOUGH_STORE_OWNERS',
    STORE_NOT_FOUND: 'STORE_NOT_FOUND',
    ID_ERROR: 'ID_ERROR'
}
export const ERROR_DICTIONARY = {
    "INTERNAL_SERVER_ERROR": {
        statusCode: 500,
        message: 'Error interno del servidor'
    },
    "ROUTE_NOT_FOUND": {
        statusCode: 404,
        message: 'Ruta no encontrada'
    },
    "ORDER_NOT_FOUND": {
        statusCode: 404,
        message: 'Orden no encontrada'
    },
    "USER_NOT_FOUND": {
        statusCode: 404,
        message: 'Usuario no encontrado'
    },
    "DELIVERY_NOT_FOUND": {
        statusCode: 404,
        message: 'Delivery no encontrado'
    },
    "INVALID_EMAIL_FORMAT": {
        statusCode: 400,
        message: 'Formato de correo electrónico inválido'
    },
    "INVALID_USER_ROLE": {
        statusCode: 400,
        message: 'Rol inválido'
    },
    "MISSING_REQUIRED_FIELDS": {
        statusCode: 400,
        message: 'Faltan campos requeridos'
    },
    "EMAIL_EXISTS": {
        statusCode: 400,
        message: 'El correo electrónico ya está en uso'
    },
    "NON_DRIVER_USER": {
        statusCode: 400,
        message: 'El usuario no es un conductor'
    },
    "INVALID_USER": {
        statusCode: 400,
        message: 'El USUARIO no existe o no es válido'
    },
    "ORDER_LENGTH_INVALID": {
        statusCode: 400,
        message: 'La orden debe tener al menos un item'
    },
    "MOCK_NOT_ENOUGH_CLIENTS": {
        statusCode: 400,
        message: 'No hay suficientes clientes simulados'
    },
    "MOCK_NOT_ENOUGH_DRIVERS": {
        statusCode: 400,
        message: 'No hay suficientes conductores simulados'
    },
    "MOCK_NOT_ENOUGH_ORDERS": {
        statusCode: 400,
        message: 'No hay suficientes órdenes simuladas sin entrega'
    },
    "INVALID_MOCK_QUANTITY": {
        statusCode: 400,
        message: 'Cantidad de mocks inválida'
    },
    "MAX_MOCK_REACHED": {
        statusCode: 400,
        message: 'Se alcanzó el máximo de mocks'
    },
    "MOCK_NOT_ENOUGH_STORE_OWNERS": {
        statusCode: 400,
        message: 'No hay suficientes dueños de tiendas simulados'
    },
    "STORE_NOT_FOUND": {
        statusCode: 404,
        message: 'Store no encontrada'
    },
    "ID_ERROR": {
        statusCode: 400,
        message: 'ID inválido'
    }
}