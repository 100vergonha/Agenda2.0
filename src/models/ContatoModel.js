const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome : {type: String, require: true},
    sobrenome : {type: String, require: false, default: ''},
    email : {type: String, require: false, default:''},
    telefone : {type: String, require: false, default:''},
    criadoEm  : {type: Date,default: Date.now},

});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato (body) {
    this.body = body;
    this.errors = [];
    this.contato = null;

}
Contato.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id);
  return contato;
};



Contato.prototype.register =  async function(){
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
};


Contato.prototype.valida= function (){
    this.cleanUp();

    //validação
    // O email precisa ser valido
    if (!this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail é inválido');
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório')
    if (!this.body.email && !this.body.telefone ) { 
        this.errors.push('Pelo menos um, contato precisa ser enviado: E-mail ou telefone.')
    }
};

Contato.prototype.cleanUp= function(){
    for(const key in this.body){
        if (typeof this.body[key] !== 'string'){
            this.body[key] = '';
        }
    }

    this.body = {
        nome : this.body.nome,
        sobrenome : this.body.sobrenome,
        email : this.body.email,
        telefone : this.body.telefone,

    };
}

    Contato.prototype.edit = async function(id){
    if(typeof id !== 'String') return;
    this.valida();
    if(this.errors.length > 0 );
    this.contato =  await ContatoModel.findOneAndUpdate(id, this.body, {new: true})
};
module.exports = Contato;