const knex = require('../utils/db');
const UrlCheckRepository = require('../repositories/UrlCheckRepository');
const randomstring = require('randomstring');


const wantedTags = [randomstring.generate(10), randomstring.generate(10)];
const unwantedTags = [randomstring.generate(10), randomstring.generate(10)];
const urls = [randomstring.generate(10),randomstring.generate(10),randomstring.generate(10)];



describe('findByTags', () => {
  beforeAll(async () => {
    await knex('url_checks').insert([
      { name: 'na1', url: urls[0], protocol: 'HTTP', tags: wantedTags },
      { name: 'nb2', url: urls[1], protocol: 'HTTP', tags: wantedTags },
      { name: 'nc3', url: urls[2], protocol: 'HTTP', tags: unwantedTags },
    ]);
  });

  afterAll(async () => {
    // await knex('url_checks').whereIn({url:urls}).del();
  });

  test('should return rows matching the provided tags', async () => {
    const result = await UrlCheckRepository.findByTags(wantedTags);

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('na1');
    expect(result[1].name).toBe('nb2');
  });

  test('should return an empty array if no rows match the provided tags', async () => {
    const tags = [randomstring.generate(10),randomstring.generate(10)];

    const result = await UrlCheckRepository.findByTags(tags);

    expect(result.length).toBe(0);
  });

  test('should throw an error if there is an error during query execution', async () => {
    const tags = ['a','b'];

    await expect(UrlCheckRepository.findByTags(tags)).rejects.toThrow(Error('Database error'));
  });
});