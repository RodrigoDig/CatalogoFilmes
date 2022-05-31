import { alterarImagem, cadastrarFilme } from '../repository/filmeRepository.js';
import { Router } from 'express';
import multer from 'multer'

const server = Router();
const upload = multer({ dest: 'storage/capasFilmes' })

server.post('/filme', async (req, resp) => {
    try{
        const filme = req.body;

        if(!filme.nome)
            throw new Error('Nome do filme é obrigatório!');
        
        if(!filme.sinopse)
            throw new Error('Sinopse do filme é obrigatório!');

        if(!filme.avaliacao)
            throw new Error('Avaliação do filme é obrigatório!');

        if(!filme.lancamento)
            throw new Error('Lançamento do filme é obrigatório!');

        if(!filme.disponivel)
            throw new Error('Campo Disponivel é obrigatório!');
    
        if(!filme.usuario)
            throw new Error('Usuario indisponivel!');

        const x = await cadastrarFilme(filme);

        resp.send(x);
    }catch (err) {
        resp.status(400).send({
            error: err.message
        })
    }

})

server.put('/filme/:id/capa', upload.single('capa') , async (req, resp) => {
    try{
        const { id } = req.params;
        const  imagem = req.file.path;

        const x = await alterarImagem(id, imagem);  
        
        resp.status(204).send();

    }catch (err) {
        resp.status(404).send({
            error: err.message
        })
    }
})















export default server;