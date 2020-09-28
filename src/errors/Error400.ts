

export class Error400 extends Error{
    status = 400;
    constructor(error?:any){
            super();
            this.name = 'Error 400';
            this.status = 400;
            this.message = 'Error de consulta';

            if (error){
                let codigo:string = error.code;
                console.log('CODIGO DE ERROR CAPTURADO',codigo);
                switch (codigo) {
                    case 'ER_DUP_ENTRY':
                        this.name = 'Error de valor duplicado';
                        this.status = 409;
                        this.message = error.message;
                        break;
                    case 'PELIGRO_SOBREESCRITURA':
                        this.name = 'Error en el Cuerpo del Request';
                        this.status = 412;
                        this.message = 'En POST esta prohibido incluir el id_automatico';
                        break;
                    case 'ER_NO_DEFAULT_FOR_FIELD':
                        this.name = 'Error en el Cuerpo del Request';
                        this.status = 416;
                        this.message = error.message;
                        break;
                
                    default:
                        this.name = error.name;
                        this.status = 400;
                        this.message = error.message;
                        break;
                }

            }

            
            

            
    };

    toJson(){
        return {
            name: this.name,
            status : this.status,
            message : this.message,
            
        };
    };

}

