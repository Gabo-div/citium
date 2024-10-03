import { Adapter } from "@citium/types/adapter";
import { Collection } from "@citium/types/collection";
import { CollectionField, FieldType } from "@citium/types/fields";
import { userSchema } from "@citium/types/user";
import type { Config } from "@libsql/client";
import { createClient } from "@libsql/client";

const sql = String.raw;

const sqliteAdapter = (config: Config): Adapter => {
  const db = createClient(config);

  const init: Adapter["init"] = async () => {
    await db.batch(
      [
        sql`
          CREATE TABLE IF NOT EXISTS "user" (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "username" TEXT NOT NULL UNIQUE,
            "password" TEXT NOT NULL,
            "role" TEXT NOT NULL DEFAULT 'user'
          );
        `,
        sql`
          CREATE TABLE IF NOT EXISTS "collection" (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "name" TEXT NOT NULL
          );
        `,
        sql`
          CREATE TABLE IF NOT EXISTS "field" (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "name" TEXT NOT NULL,
            "type" TEXT NOT NULL,
            "collection_id" INTEGER NOT NULL,
            FOREIGN KEY ("collection_id") REFERENCES "collection" ("id") ON DELETE CASCADE
          );
        `,
      ],
      "write",
    );
  };

  const createCollection: Adapter["createCollection"] = async (
    name,
    fields,
  ) => {
    const findCollectionResult = await db.execute({
      sql: sql`
        SELECT
          *
        FROM
          "collection"
        WHERE
          "name" = :name;
      `,
      args: { name },
    });

    if (findCollectionResult.rows.length !== 0) {
      return false;
    }

    const transaction = await db.transaction("write");

    const createdCollectionResult = await transaction.execute({
      sql: sql`
        INSERT INTO
          "collection" ("name")
        VALUES
          (:name);
      `,
      args: { name },
    });

    const createdCollectionId = createdCollectionResult.lastInsertRowid;

    if (!createdCollectionId) {
      await transaction.rollback();
      return false;
    }

    for (const field of fields) {
      const fieldResult = await transaction.execute({
        sql: sql`
          INSERT INTO
            "field" ("name", "type", "collection_id")
          VALUES
            (:name, :type, :collection_id);
        `,
        args: {
          name: field.name,
          type: field.type,
          collection_id: createdCollectionId,
        },
      });

      const createdFieldId = fieldResult.lastInsertRowid;

      if (!createdFieldId) {
        await transaction.rollback();
        return false;
      }
    }

    await transaction.commit();
    return true;
  };

  const getCollection: Adapter["getCollection"] = async (name) => {
    const transaction = await db.transaction("read");

    const collectionResult = await transaction.execute({
      sql: sql`
        SELECT
          *
        FROM
          "collection"
        WHERE
          "name" = :name;
      `,
      args: { name },
    });

    const foundCollection = collectionResult.rows[0];

    if (!foundCollection) {
      await transaction.rollback();
      return null;
    }

    const collection: Collection = {
      name: foundCollection.name as string,
      fields: [],
    };

    const fieldsResult = await transaction.execute({
      sql: sql`
        SELECT
          *
        FROM
          "field"
        WHERE
          "collection_id" = :collection_id;
      `,
      args: { collection_id: foundCollection.id as number },
    });

    for (const field of fieldsResult.rows) {
      collection.fields.push({
        name: field.name as string,
        type: field.type as FieldType,
      });
    }

    await transaction.commit();

    return collection;
  };

  const getCollections: Adapter["getCollections"] = async () => {
    const transaction = await db.transaction("read");

    const collectionsResult = await transaction.execute(sql`
      SELECT
        *
      FROM
        "collection"
    `);

    const collections: Collection[] = [];

    for (const collection of collectionsResult.rows) {
      const collectionFieldsResult = await transaction.execute({
        sql: sql`
          SELECT
            *
          FROM
            "field"
          WHERE
            "collection_id" = :collection_id;
        `,
        args: { collection_id: collection.id as number },
      });

      const collectionFields: CollectionField[] = [];

      for (const field of collectionFieldsResult.rows) {
        collectionFields.push({
          name: field.name as string,
          type: field.type as FieldType,
        });
      }

      collections.push({
        name: collection.name as string,
        fields: collectionFields,
      });
    }

    await transaction.commit();

    return collections;
  };

  const createUser: Adapter["createUser"] = async (username, password) => {
    const findUserResult = await db.execute({
      sql: sql`
        SELECT
          *
        FROM
          "user"
        WHERE
          "username" = :username;
      `,
      args: { username },
    });

    if (findUserResult.rows.length !== 0) {
      return false;
    }

    const transaction = await db.transaction("write");

    const createdUserResult = await transaction.execute({
      sql: sql`
        INSERT INTO
          "user" ("username", "password")
        VALUES
          (:username, :password);
      `,
      args: { username, password },
    });

    const createdUserId = createdUserResult.lastInsertRowid;

    if (!createdUserId) {
      await transaction.rollback();
      return false;
    }

    await transaction.commit();
    return true;
  };

  const getUserByUsername: Adapter["getUserByUsername"] = async (username) => {
    const userResult = await db.execute({
      sql: sql`
        SELECT
          *
        FROM
          "user"
        WHERE
          "username" = :username;
      `,
      args: { username },
    });

    const foundUser = userResult.rows[0];
    const result = userSchema.safeParse(foundUser);

    if (!result.success) {
      return null;
    }

    return result.data;
  };

  const getUserById: Adapter["getUserById"] = async (id) => {
    const userResult = await db.execute({
      sql: sql`
        SELECT
          *
        FROM
          "user"
        WHERE
          "id" = :id;
      `,
      args: { id },
    });

    const foundUser = userResult.rows[0];
    const result = userSchema.safeParse(foundUser);

    if (!result.success) {
      return null;
    }

    return result.data;
  };

  return {
    init,
    createCollection,
    getCollection,
    getCollections,
    createUser,
    getUserByUsername,
    getUserById,
  };
};

export default sqliteAdapter;
