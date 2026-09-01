import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { TPosts } from "src/types"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

// TODO: react query를 사용해서 처음 불러온 뒤로는 해당데이터만 사용하도록 수정
export const getPosts = async () => {
  let id = CONFIG.notionConfig.pageId as string
  if (!id) return []

  const api = new NotionAPI()

  try {
    const response = await api.getPage(id)
    id = idToUuid(id)
    const collections = Object.values(response.collection || {})
    if (collections.length === 0) return []

    const collectionValue = collections[0]?.value as any
    const collection = collectionValue?.value ?? collectionValue
    const block = response.block
    const schema = collection?.schema

    const blockValue = (block?.[id]?.value as any)?.value ?? block?.[id]?.value
    const rawMetadata = blockValue

    // Check Type
    const isCollection =
      rawMetadata?.type === "collection_view_page" ||
      rawMetadata?.type === "collection_view" ||
      rawMetadata?.type === "page" ||
      Object.keys(response.collection || {}).length > 0

    if (!isCollection) {
      return []
    }

    // Construct Data
    const pageIds = getAllPageIds(response)
    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const pageId = pageIds[i]
      const properties = (await getPageProperties(pageId, block, schema)) || {}

      const pageBlockValue =
        (block?.[pageId]?.value as any)?.value ?? block?.[pageId]?.value
      if (pageBlockValue) {
        properties.createdTime = new Date(
          pageBlockValue?.created_time || Date.now()
        ).toString()
        properties.fullWidth =
          (pageBlockValue?.format as any)?.page_full_width ?? false
      }

      if (!properties.slug && properties.title) {
        properties.slug = pageId.replace(/-/g, "")
      }

      data.push(properties)
    }

    // Sort by date
    data.sort((a: any, b: any) => {
      const dateA: any = new Date(a?.date?.start_date || a.createdTime || 0)
      const dateB: any = new Date(b?.date?.start_date || b.createdTime || 0)
      return dateB - dateA
    })

    const posts = data as TPosts
    return posts
  } catch (error) {
    console.error("Error fetching Notion posts:", error)
    return []
  }
}
