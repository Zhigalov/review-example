const _ = require('lodash');
const got = require('got');

class Comment {
    static getAuthorsId(comments) {
        return _.map(comments, 'authorId');
    }

    static async getAuthors(authorsId) {
        if (_.isEmpty(authorsId)) {
            return {};
        }

        const res = await got('http://blackbox.net/getAuthors', {
            query: { authorId: authorsId.join(',') },
            json: true
        });

        return res.body;
    }

    static mergeAuthors(comments, authors) {
        return _.map(comments, comment => ({
            ...comment,
            name: authors[comment.authorId]
        }));
    }
}

module.exports = Comment;
