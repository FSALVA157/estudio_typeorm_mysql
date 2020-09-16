

export class Error404 extends Error{
    status: number;
    constructor(){
            super();
            this.name = 'Error 404';
            this.status = 404;
            this.message = 'El recurso solicitado no Existe';
            
    };

    toJson(){
        return {
            name: this.name,
            status : this.status,
            message : this.message,
            
        };
    };

}

