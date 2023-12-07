import { PageLinks } from "./PageLinks"
import { PageMetaData } from "./PageMetaData"

export type Page<T> = {
  items: T[]
  meta: PageMetaData
  links: PageLinks
}
