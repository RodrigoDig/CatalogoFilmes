import { alterarImagem, cadastrarFilme, consulta } from '../repository/filmeRepository.js';

import multer from 'multer'

import { Router } from 'express';

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

server.put('/filme/:id/imagem', upload.single('capa') , async (req, resp) => {
    try{
        const { id } = req.params;
        const  imagem = req.file.path;

        const resposta = await alterarImagem(imagem, id); 
        if( resposta != 1 )
            throw new Error('A imagem não pode ser salva');
             
        resp.status(204).send();

    }catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


server.get('/filme', async(req, resp) =>{
    try{
        const resposta = await consulta();
        resp.send(resposta);
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})












export default server;