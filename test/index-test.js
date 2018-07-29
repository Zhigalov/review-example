const index = require('..');
const nock = require('nock');
const assert = require('assert');

describe('Comments controller', () => {
    beforeEach(nock.cleanAll);

    it('should get and merge authors', async () => {
        nock('http://blackbox.net')
            .get('/getAuthors')
            .query({ authorId: '123,234' })
            .reply(200, {
                '123': 'Ivanov',
                '234': 'Petrov'
            });

        const comments = [
            { text: 'Comment #1', authorId: 123 },
            { text: 'Comment #2', authorId: 234 }
        ];
        const actual = await index(comments);
        const expected = [
            { text: 'Comment #1', authorId: 123, name: 'Ivanov' },
            { text: 'Comment #2', authorId: 234, name: 'Petrov' }
        ];

        assert.deepStrictEqual(actual, expected);
    });
});
