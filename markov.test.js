const { MarkovMachine } = require('./markov')

describe("markov class", function () {
    let mm;

    beforeAll(function () {
        mm = new MarkovMachine('the cat in the hat is a cat in the hat')
    })

    test("makes a chain with correct key-value pairs", function () {
        let mmChain = mm.makeChains();

        expect(mmChain).toEqual(

            {
                the: ['cat', 'hat', 'hat'],
                cat: ['in', 'in'],
                in: ['the', 'the'],
                hat: ['is', null],
                is: ['a'],
                a: ['cat']
            }
        );
    });


    test("text is less than or equal to argument limit and greater than 1", function () {
        let mmText = mm.makeText(20)
        let wordCount = mmText.trim().split(/\s+/).length
        expect(wordCount).toBeLessThanOrEqual(20)
        expect(wordCount).toBeGreaterThan(1)
    })

    test("text contains valid words", function () {
        let mmText = mm.makeText(20);
        let words = mmText.trim().split(/\s+/);
        for (word of words) {
            expect('the cat in the hat is a cat in the hat').toContain(word);
        }
    })

})

