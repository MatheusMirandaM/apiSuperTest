const supertest = require('supertest'); 
const assert = require('chai').assert; 
const baseUrl = 'https://petstore.swagger.io/v2'; 
const request = supertest(baseUrl);

let frase;
let token;

describe('PetStore Swagger - User', () => {
 
    it('GET User Login', () => {

        username = "test";
        password = "1234";

        return request
            .get(`/user/login?username=${username}&password=${password}`)
            .then((response) => {
                assert.equal(response.statusCode, 200);
                assert.equal(response.body.code, 200);
                assert.equal(response.body.type, 'unknown');
                mensagem = response.body.message;
                frase = mensagem.substring(0,mensagem.indexOf(':') + 1);
                console.log('A frase eh ' + frase);
                assert.equal(frase,'logged in user session:');
                token = mensagem.substring(mensagem.indexOf(':') + 1);
                console.log('Token: ' + token);
            });
        
    });
    
});