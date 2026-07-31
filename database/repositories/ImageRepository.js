import { imageQueries } from '../queries/images.js';
import { deleteById, parseGallery, serializeGallery, updateById } from './helpers.js';

export class ImageRepository {
  constructor(db) {
    this.db = db;
  }

  getAll() {
    return this.db.all(imageQueries.all).map(parseGallery);
  }

  getById(id) {
    return parseGallery(this.db.get(imageQueries.byId, [id]));
  }

  getByCity(identifier) {
    return this.db.all(imageQueries.byCity, [identifier, identifier]).map(parseGallery);
  }

  getByCountry(countryId) {
    return this.db.all(
      `SELECT images.* FROM images JOIN cities ON cities.id = images.city_id WHERE cities.country_id = ?`,
      [countryId],
    ).map(parseGallery);
  }

  search(term) {
    return this.db.all(imageQueries.search, [`%${term}%`]).map(parseGallery);
  }

  insert(image) {
    return parseGallery(this.db.get(imageQueries.upsert, [
      image.city_id,
      image.hero_image ?? null,
      serializeGallery(image.gallery ?? []),
    ]));
  }

  update(id, changes) {
    const values = { ...changes };
    if (values.gallery !== undefined) values.gallery = serializeGallery(values.gallery);
    return parseGallery(updateById(
      this.db,
      'images',
      id,
      values,
      ['city_id', 'hero_image', 'gallery'],
      imageQueries.byId,
    ));
  }

  delete(id) {
    return deleteById(this.db, 'images', id);
  }
}
