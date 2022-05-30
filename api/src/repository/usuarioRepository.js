import {con} from './connection.js'

export function login(email, senha){
    const comando = 
                `select id_usuario 		id,
                    nm_usuario		nome,
                    ds_email			email
                    from tb_usuario
                    where ds_email 		= 'admin@admin.com.br'
                    and ds_senha			= '1234';`
}