interface requestInterface {
    description: string,
    required: boolean,
    content: {
        'application/json': {
            schema: any,
        },
    },
}
const defaultRequest: requestInterface = {
    description: "Valores necesitados",
    required: true,
    content: {
        'application/json': {
            schema: {},
        },
    }
};
export const reqSignUp: requestInterface = {
    ...defaultRequest,
    description: "Método para registrar un nuevo usuario de tipo consumidor",
    content: {
        'application/json': {
            schema: {
                type: "object",
                description: "",
                required: ["codigo", "password", "nombreUno", "apellidoUno"],
                properties: {
                    celular: {
                        type: "number",
                        minLength: 10,
                        maxLength: 10,
                    },
                    email: {
                        type: "string",
                        maxLength: 100,
                        format: 'email',
                    },
                    codigo: {
                        type: "number",
                        minLength: 4,
                        maxLength: 4,
                    },
                    password: {
                        pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
                        type: "string",
                        minLength: 8,
                        maxLength: 36
                    },
                    nombreUno: {
                        type: "string",
                        maxLength: 30
                    },
                    nombreDos: {
                        type: "string",
                        maxLength: 30
                    },
                    apellidoUno: {
                        type: "string",
                        maxLength: 30
                    },
                    apellidoDos: {
                        type: "string",
                        maxLength: 30
                    },
                }
            },
        },
    },
}
export const reqRequireSignUp: requestInterface = {
    ...defaultRequest,
    description: "Método para registrar un nuevo usuario de tipo consumidor",
    content: {
        'application/json': {
            schema: {
                type: "object",
                required: ["celular"],
                properties: {
                    celular: {
                        type: "number",
                        minLength: 10,
                        maxLength: 10,
                    },
                    email: {
                        type: "string",
                        maxLength: 100,
                        format: 'email',
                    }
                }
            },
        },
    },
}
export const reqRequireChangePassword: requestInterface = {
    ...defaultRequest,
    description: "Método para solicitar cambio de contraseña",
    content: {
        'application/json': {
            schema: {
                type: "object",
                description: "",
                required: ["celular"],
                properties: {
                    celular: {
                        type: "number",
                        minLength: 10,
                        maxLength: 10,
                    },
                    email: {
                        type: "string",
                        maxLength: 100,
                        format: 'email',
                    }
                }
            },
        },
    },
}
export const reqChangePassword: requestInterface = {
    ...defaultRequest,
    description: "Método para solicitar cambio de contraseña",
    content: {
        'application/json': {
            schema: {
                type: "object",
                description: "",
                required: ["celular", "newPassword", "codigo"],
                properties: {
                    celular: {
                        type: "number",
                        minLength: 10,
                        maxLength: 10,
                    },
                    email: {
                        type: "string",
                        maxLength: 100,
                        format: 'email',
                    },
                    newPassword: {
                        pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
                        type: "string",
                        minLength: 8
                    },
                    codigo: {
                        type: "number",
                        minLength: 4,
                        maxLength: 4,
                    },
                }
            },
        },
    },
}
export const reqAgregarRol: requestInterface = {
    ...defaultRequest,
    description: "Método para agregar un rol a usuario",
    content: {
        'application/json': {
            schema: {
                type: "object",
                description: "",
                required: ["newRol"],
                properties: {
                    newRol: {
                        type: "string",
                        minLength: 5,
                        maxLength: 100
                    }
                }
            },
        },
    }
};
export const reqSignIn: requestInterface = {
    ...defaultRequest,
    description: "Método para iniciar sesión",
    content: {
        'application/json': {
            schema: {
                type: "object",
                description: "",
                required: ["password"],
                properties: {
                    celular: {
                        type: "number",
                        minLength: 10,
                        maxLength: 10,
                    },
                    email: {
                        type: "string",
                        format: "email",
                        maxLength: 100
                    },
                    password: {
                        pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
                        type: "string",
                        minLength: 8
                    }
                }
            },
        },
    }
};