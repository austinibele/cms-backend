import { tags } from "typia";

/**
 * Commen Entity.
 *
 * Common entity definition for entities having UUID type primary key value.
 *
 * @author Austinibele
 */
export interface IEntity {
  /**
   * Primary Key.
   */
  id: string & tags.Format<"uuid">;
}
