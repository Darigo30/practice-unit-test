import { expect } from 'chai';
import * as main from '../main.js';


//Resultados

const hellowordText = main.helloword();
const subtraction = main.subtraction(4,2);
const arrayOfNumbers = main.arrayOfNumbers();

describe('Main Suite', () => { // El describe es una suite que contendrá todos los test

    //Puedo tambien hacer un describe para cada test dentro de una suite 

    describe('Hello Word Method - Test Cases', () => {
        it('Hello Word Text is the expected result', () => { // It es el test de la funcion hellowordText
            expect(hellowordText).to.equal(hellowordText, 'hello word') // con el expect poedemos llamar a los metodos de chai para poder validar la exepción de esa función
        })
        it('Validate data type', () =>{
            expect(hellowordText).to.string(hellowordText, 'string', 'The result to be an string') // se pasa un tercer valor para ver el error en consola si no cumple lo indicado
        })
    })

    describe('Substraction Method - Test Cases', () => {
        it('Less than 5', () => { 
            expect(subtraction).to.below(5) //no se pasa a la variable reservada si no que pasas el valor que quieres validar 
        })
        it('Is a number', () => { 
            expect(subtraction).to.be.a('number') // debe ser un numero
        })
    })

    describe('Array Method - Test Cases', () =>  {
        it('Array include 5', () => { 
            expect(arrayOfNumbers).to.include(3) // si incluye el 3
        })
        it('Array lenght', () => { 
            expect(arrayOfNumbers).to.lengthOf(3) // cantidad de valores en el array
        })
    })
})