const assert = require('assert');
const Comment = require('../comment');
const nock = require('nock');

describe('Comment', () => {
    describe('getAuthorsId', () => {
        it('should return authors id', () => {
            const comments = [
                { text: 'comment #1', authorId: 123 },
                { text: 'comment #2', authorId: 234 }
            ];
            const actual = Comment.getAuthorsId(comments);
            const expected = [123, 234];

            assert.deepStrictEqual(actual, expected);
        });
    });

    describe('getAuthors', () => {
        beforeEach(nock.cleanAll);

        it('should return nothing when authorsId is empty', async () => {
            const actual = await Comment.getAuthors([]);

            assert.deepStrictEqual(actual, {});
        });

        it('should return authors', async () => {
            nock('http://blackbox.net')
                .get('/getAuthors')
                .query({ authorId: '123,234' })
                .reply(200, {
                    '123': 'Ivanov',
                    '234': 'Petrov'
                });
            const authorsId = [123, 234];
            const actual = await Comment.getAuthors(authorsId);
            const expected = {
                '123': 'Ivanov',
                '234': 'Petrov'
            };

            assert.deepStrictEqual(actual, expected);
        });
    });

    describe('mergeAuthors', () => {
        it('should merge authors', () => {
            const comments = [
                { text: 'comment #1', authorId: 123 },
                { text: 'comment #2', authorId: 234 }
            ];
            const authors = {
                '123': 'Ivanov',
                '234': 'Petrov'
            };
            const actual = Comment.mergeAuthors(comments, authors);
            const expected = [
                { text: 'comment #1', authorId: 123, name: 'Ivanov' },
                { text: 'comment #2', authorId: 234, name: 'Petrov' }
            ];

            assert.deepStrictEqual(actual, expected);
        });
    });
});
