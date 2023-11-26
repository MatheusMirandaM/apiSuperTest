// Biblioteca
const supertest = require('supertest'); // Framework de teste de API
const assert = require('chai').assert; // Função de assertiva do resultado

const baseUrl = 'https://petstore.swagger.io/v2'; // URL base
const petId = 11730189; // id do animal

describe('PetStore Swegger - Pet', () => {
    
    const request = supertest(baseUrl);
    const pets = require('../json/petN')
    const pet = require('../json/petBase.json')

    // Inserir um registro
    it('POST Pet', () => {

        const jsonFile = require('../json/pet.json'); // Apontamento para o arquivo com o json 

        return request          // chama a requisição
            .post('/pet')       // endpoint (path))
            .send(jsonFile)     // envia os dados no corpo da requisição
            .then((response) => {
                assert.equal(response.statusCode, 200);
                assert.equal(response.body.id, petId);
                assert.equal(response.body.name, "Kira");
                assert.equal(response.body.status, "available");
            });
    
    });

    // Consultar registro
    it('GET - Pet', () => {
        
        return request
            .get(`/pet/${petId}`)
            .then((response) => {
                assert.equal(response.statusCode, 200);
                assert.equal(response.body.id, petId);
                assert.equal(response.body.name, "Kira");
                assert.equal(response.body.status, "available");
            });

    });

    // Atualizar registro
    it('PUT - Pet', () => {

        const jsonFile = require('../json/petPUT.json');
        
        return request
            .put('/pet')
            .send(jsonFile)
            .then((response) => {
                assert.equal(response.statusCode, 200);
                assert.equal(response.body.id, petId);
                assert.equal(response.body.name, 'Kira');
                assert.equal(response.body.tags[1].id, 4);
                assert.equal(response.body.tags[1].name, "castrated");
                assert.equal(response.body.status, "solded");
            });

    });

    // Deletar registro
    it('DELETE - Pet', () => {

        return request
            .delete(`/pet/${petId}`)
            .then((response) => {
                assert.equal(response.statusCode, 200);
            });
        
    });

    pets.array.forEach(({ nomePet, idPet, nomeCadegoria, idCategoria }) => {

        it('Setup Swagger - Add Pets', () => {

            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCadegoria
            pet.tags[0].id = 3
            pet.tags[0].name = "vaccinated"
            pet.status = "done"

            return request
                .post('/pet')
                .send(pet)
                .then((response) => {
                    assert.equal(response.statusCode, 200);
                });

        });

        it('Teardown Swagger - Delet Pets - ' + nomePet, () => {

            return request
                .delete(`/pet/${idPet}`)
                .then((response) => {
                    assert.equal(response.statusCode, 200);
                });
            
        });

    });

});